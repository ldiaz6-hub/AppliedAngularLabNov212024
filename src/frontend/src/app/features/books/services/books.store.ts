import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BookEntity, SortKeys } from '../types';
import { BooksComponent } from '../books.component';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BooksDataService } from './books-data.service';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withRequestStatus, setPending, setFulfilled } from '../../../shared';

type BooksState = {
  sortingKey: SortKeys;
  selectedBook: BookEntity | null;
};
export const BookStore = signalStore(
  withDevtools('books'),
  withRequestStatus(),
  withState<BooksState>({
    sortingKey: 'id',
    selectedBook: null,
  }),
  withEntities<BookEntity>(),
  withMethods((store) => {
    const service = inject(BooksDataService);
    return {
      setSelectedBook: (bookId: string) => {
        patchState(store, { selectedBook: store.entityMap()[bookId] });
      },
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            service.loadBooks().pipe(
              tapResponse({
                next(value) {
                  patchState(store, setEntities(value));
                },
                error(error) {
                  console.log(error);
                },
                finalize() {
                  patchState(store, setFulfilled());
                },
              }),
            ),
          ),
        ),
      ),
      setSortKey: (key: SortKeys) => patchState(store, { sortingKey: key }),
    };
  }),
  withComputed((store) => {
    return {
      stats: computed(() => {
        const books = store.entities();
        const numberOfBooks = books.length;
        const earliestBook = books.reduce((a: number, b: BookEntity) => {
          return b.year < a ? b.year : a;
        }, Number.MAX_VALUE);
        const latestBook = books.reduce((a: number, b: BookEntity) => {
          return b.year > a ? b.year : a;
        }, Number.MIN_VALUE);

        const averagePages = Math.round(
          books.map((a) => a.pages).reduce((a, b) => a + b) / numberOfBooks,
        );

        return { numberOfBooks, earliestBook, latestBook, averagePages };
      }),
      books: computed(() => {
        const books = store.entities();
        const sortedBy = store.sortingKey();
        if (sortedBy !== 'id' && sortedBy !== 'year') {
          return books.sort((a, b) =>
            a[sortedBy].toString().localeCompare(b[sortedBy].toString()),
          );
        } else {
          return books.sort((a, b) => +a[sortedBy] - +b[sortedBy]);
        }
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);

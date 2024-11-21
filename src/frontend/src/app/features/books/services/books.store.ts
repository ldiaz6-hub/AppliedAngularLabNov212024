import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { SortKeys } from '../types';
import { BooksComponent } from '../books.component';

type BooksState = {
  sortingKey: SortKeys;
};
export const BookStore = signalStore(
  withState<BooksState>({
    sortingKey: 'id',
  }),
  withMethods((store) => {
    return {
      setSortKey: (key: SortKeys) => patchState(store, { sortingKey: key }),
    };
  }),
);

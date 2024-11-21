import {
  Component,
  ChangeDetectionStrategy,
  computed,
  resource,
  signal,
  inject,
} from '@angular/core';
import { BookEntity, SortKeys } from '../types';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div>
      <p>Number of Books {{ stats().numberOfBooks }}</p>
      <p>Earliest Book {{ stats().earliestBook }}</p>
      <p>Latest Book {{ stats().latestBook }}</p>
      <p>Average Pages {{ stats().averagePages }}</p>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <button
                class="btn btn-xs"
                [disabled]="store.sortingKey() === 'id'"
                (click)="store.setSortKey('id')"
              >
                Id
              </button>
            </th>
            <th>
              <button
                class="btn btn-xs"
                [disabled]="store.sortingKey() === 'title'"
                (click)="store.setSortKey('id')"
              >
                Title
              </button>
            </th>
            <th>
              <button
                class="btn btn-xs"
                [disabled]="store.sortingKey() === 'author'"
                (click)="store.setSortKey('author')"
              >
                Author
              </button>
            </th>
            <th>
              <button
                class="btn btn-xs"
                [disabled]="store.sortingKey() === 'year'"
                (click)="store.setSortKey('year')"
              >
                Year
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          @for (book of booksSorted(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>`,
  styles: ``,
})
export class ListComponent {
  store = inject(BookStore);
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  sortedBy = signal<SortKeys>('id');
  booksSorted = computed(() => {
    const books = this.books.value() || [];
    const sortedBy = this.sortedBy();
    if (sortedBy !== 'id' && sortedBy !== 'year') {
      return books.sort((a, b) =>
        a[this.sortedBy()]
          .toString()
          .localeCompare(b[this.sortedBy()].toString()),
      );
    } else {
      return books.sort((a, b) => +a[this.sortedBy()] - +b[this.sortedBy()]);
    }
  });

  setSort(by: SortKeys) {
    this.sortedBy.set(by);
  }
  stats = computed(() => {
    const books = this.books.value() || [];
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
  });
}

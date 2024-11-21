import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  computed,
} from '@angular/core';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
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
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of books.value(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class BooksComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

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

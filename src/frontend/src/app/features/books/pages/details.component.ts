import {
  Component,
  ChangeDetectionStrategy,
  input,
  OnInit,
  inject,
  effect,
} from '@angular/core';
import { BookStore } from '../services/books.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    @if (store.isFulfilled()) {
      <p>Details Go Here for {{ id() }}</p>

      @if (!store.selectedBook()) {
        <p>No Book For You! Try again.</p>
      } @else {
        <pre>{{ store.selectedBook() | json }}</pre>
      }
    } @else {
      <p>stand by - getting your data, yo.</p>
    }
  `,
  styles: ``,
})
export class DetailsComponent {
  // books/details/938983

  store = inject(BookStore);
  id = input.required<string>();

  constructor() {
    effect(() => {
      if (this.store.isFulfilled()) {
        this.store.setSelectedBook(this.id()); // < 19 this wouldn't work.
      }
    });
  }
}

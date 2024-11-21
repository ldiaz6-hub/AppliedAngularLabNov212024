import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../services/books.store';

@Component({
  selector: 'app-books-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card">
      <p>Sorting Preferences</p>
      <div class="join">
        <button
          (click)="store.setSortKey('id')"
          [disabled]="store.sortingKey() === 'id'"
          class="btn join-item"
        >
          Id
        </button>
        <button
          (click)="store.setSortKey('title')"
          [disabled]="store.sortingKey() === 'title'"
          class="btn join-item"
        >
          Title
        </button>
        <button
          (click)="store.setSortKey('author')"
          [disabled]="store.sortingKey() === 'author'"
          class="btn join-item"
        >
          Author
        </button>
        <button
          (click)="store.setSortKey('year')"
          [disabled]="store.sortingKey() === 'year'"
          class="btn join-item"
        >
          Year
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(BookStore);
}

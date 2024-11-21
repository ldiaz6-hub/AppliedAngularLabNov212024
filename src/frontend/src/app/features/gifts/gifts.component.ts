import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PeopleStore } from './services/people.store';
import { StatusBarComponent } from './components/status-bar.component';

@Component({
  selector: 'app-gifts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, StatusBarComponent],
  template: `
    @if (store.isFulfilled()) {
      <app-gifts-status-bar />
      <div class="flex gap-8">
        <a class="link" routerLink="people">People</a>
        <a class="link" routerLink="people-entry">Add A Person To Your List</a>
      </div>

      <router-outlet />
    } @else {
      <p>Getting your Data!</p>
      <span class="loading loading-spinner text-primary"></span>
      <span class="loading loading-spinner text-secondary"></span>
      <span class="loading loading-spinner text-accent"></span>
      <span class="loading loading-spinner text-neutral"></span>
      <span class="loading loading-spinner text-info"></span>
      <span class="loading loading-spinner text-success"></span>
      <span class="loading loading-spinner text-warning"></span>
      <span class="loading loading-spinner text-error"></span>
    }

    <button class="btn btn-error" (click)="store.load()">
      Reload the data
    </button>
  `,
  styles: ``,
})
export class GiftsComponent {
  store = inject(PeopleStore);
}

import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PeopleStore } from '../services/people.store';

@Component({
  selector: 'app-gifts-people',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  providers: [],
  template: `
    <div class="grid">
      @for (p of store.entities(); track p.id) {
        <div class="card bg-base-100 w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{{ p.name }}</h2>

            <h3>{{ p.name }} is {{ p.location | titlecase }}</h3>

            @if (p.isPending) {
              <span class="loading loading-dots loading-lg"></span> Saving your
              new person!
            }
          </div>
        </div>
      } @empty {
        <p>You have no people on your list! Add Some</p>
      }
    </div>
  `,
  styles: ``,
})
export class PeopleComponent {
  store = inject(PeopleStore);
}

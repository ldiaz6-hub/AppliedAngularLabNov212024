import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PeopleStore } from '../services/people.store';

@Component({
  selector: 'app-gifts-status-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      People On Your List
      <div class="badge badge-secondary">{{ store.totalPeople() }}</div>
    </div>
    @if (store.hasPeople()) {
      <div>
        People On Your List that are Local
        <div class="badge badge-secondary">{{ store.totalLocal() }}</div>
      </div>
      <div>
        People On Your List that are Remote
        <div class="badge badge-secondary">{{ store.totalRemote() }}</div>
      </div>
      <div>
        Pending People
        <div class="badge badge-secondary">{{ store.totalPending() }}</div>
      </div>
    }
  `,
  styles: ``,
})
export class StatusBarComponent {
  store = inject(PeopleStore); // this is the only thing in my component
}

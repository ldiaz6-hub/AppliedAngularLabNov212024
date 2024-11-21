import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatusBarComponent } from '../components/status-bar.component';
import { PeopleStore } from '../services/people.store';

@Component({
  selector: 'app-gifts-people-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe, StatusBarComponent],
  providers: [],
  template: `
    <h1>NEW VERSION</h1>
    <app-gifts-status-bar />

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (p of store.entities(); track p.id; let odd = $odd) {
            @if (odd) {
              <tr class="bg-base-200">
                <td>{{ p.name }}</td>
                <td>{{ p.location | titlecase }}</td>
              </tr>
            } @else {
              <tr>
                <td>{{ p.name }}</td>
                <td>{{ p.location | titlecase }}</td>
              </tr>
            }
          }
          <!-- row 2 -->
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class PeopleTableComponent {
  store = inject(PeopleStore);
}

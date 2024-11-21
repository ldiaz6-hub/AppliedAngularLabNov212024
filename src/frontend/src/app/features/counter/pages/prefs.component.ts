import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    @for (v of store.byOptions(); track v) {
      <button
        (click)="store.setBy(v)"
        [disabled]="store.by() === v"
        class="btn join-item"
      >
        {{ v }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}

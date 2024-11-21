import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter.store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div data-testid="counter-feature-ui">
      <button
        [disabled]="store.decrementDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span data-testid="current">{{ store.current() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
      <button (click)="store.reset()" class="btn btn-primary">Reset</button>

      <div>
        <span>{{ store.fizzBuzz() }}</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}

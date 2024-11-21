import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { WITHDRAWAL_AMOUNTS, WithdrawAmount } from '../types';
import { AtmStore } from '../services/atm.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-atm-withdrawal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <p>Your Balance is {{ store.balance() | currency }}</p>
    <div class="grid grid-flow-col gap-8">
      @for (amt of store.amounts(); track amt) {
        <button
          [disabled]="store.balance() < amt"
          (click)="store.withdraw(amt)"
          class="btn btn-primary ring-2 ring-white"
        >
          {{ amt | currency }}
        </button>
      }
    </div>

    @if (store.atBalanceThreshold()) {
      <a class="btn btn-warning" routerLink="../deposit"
        >Low Balance - Make a Deposit</a
      >
    }
  `,
  styles: ``,
})
export class WithdrawalComponent {
  store = inject(AtmStore);
}

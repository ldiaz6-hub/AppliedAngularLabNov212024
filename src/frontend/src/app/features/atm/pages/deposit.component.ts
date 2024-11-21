import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AtmStore } from '../services/atm.store';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, ReactiveFormsModule],
  template: `
    <p>Your Balance is {{ store.balance() | currency }}</p>
    <form [formGroup]="form" (ngSubmit)="deposit()">
      <div class="form-control">
        <label for="amount" class="label">Amount</label>
        <input
          formControlName="amount"
          type="number"
          name="amount"
          class="input"
        />
        <button type="submit" class="btn btn-secondary">Make Deposit</button>
      </div>
    </form>
  `,
  styles: ``,
})
export class DepositComponent {
  store = inject(AtmStore);

  form = new FormGroup({
    amount: new FormControl<number>(100, { nonNullable: true }),
  });

  deposit() {
    const amount = this.form.controls.amount.value;
    this.store.deposit(amount);
  }
}

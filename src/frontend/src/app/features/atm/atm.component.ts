import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex gap-8">
      <a class="btn btn-primary" routerLink="withdrawal">Withdrawals</a>
      <a class="btn btn-primary" routerLink="deposit">Deposit</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class AtmComponent {}

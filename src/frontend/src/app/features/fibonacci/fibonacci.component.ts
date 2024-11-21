import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fibonacci',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex gap-8">
      <a class="btn btn-primary btn-sm" routerLink="fibonacci-ui">Fibonacci</a>
    </div>
    <div class="p-12">
      <router-outlet />
    </div>
  `,
  styles: ``
})
export class FibonacciComponent {

}

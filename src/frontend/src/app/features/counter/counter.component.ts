import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `<div data-testid="counter-feature">
    <div class="flex gap-8">
      <a class="btn btn-primary btn-sm" routerLink="ui">Counter UI</a>
      <a class="btn btn-primary btn-sm" routerLink="prefs">Prefs</a>
    </div>
    <div class="p-12">
      <router-outlet />
    </div>
  </div>`,
  styles: ``,
})
export class CounterComponent {}

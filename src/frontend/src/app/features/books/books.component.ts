import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-8">
      <a class="btn btn-sm btn-primary" routerLink="list">List</a>
      <a class="btn btn-sm btn-primary" routerLink="stats">Stats</a>
      <a class="btn btn-sm btn-primary" routerLink="prefs">Prefs</a>
    </div>
    <div class="p-12">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class BooksComponent {}

import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-nav-bar />

    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavBarComponent, RouterOutlet],
})
export class AppComponent {}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>About...</p> `,
  styles: ``,
})
export class AboutComponent {}

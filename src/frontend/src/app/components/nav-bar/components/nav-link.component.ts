import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLinkModel } from '../types';
import { FeatureDirective } from '../../../shared/feature-management/feature.directive';

@Component({
  selector: 'app-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective],
  template: `
    @if (link().featureGated) {
      <a
        *feature="link().featureGated ?? ''"
        (click)="navigated.emit(link())"
        [routerLink]="[link().path]"
        >{{ link().text }}</a
      >
    } @else {
      <a (click)="navigated.emit(link())" [routerLink]="[link().path]">{{
        link().text
      }}</a>
    }
  `,
  styles: ``,
})
export class NavLinkComponent {
  link = input.required<NavLinkModel>();

  //@Output() navigated = new EventEmitter<NavLinkModel>();
  navigated = output<NavLinkModel>();
}

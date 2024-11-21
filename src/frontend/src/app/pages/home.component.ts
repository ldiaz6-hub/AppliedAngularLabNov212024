import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GiftDataService } from '../features/gifts/services/gift-data.service';
import { FeatureDirective } from '../shared/feature-management/feature.directive';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureDirective],
  providers: [GiftDataService],
  template: `
    <h1>Above</h1>
    @defer {
      <div *feature="'home-page'" class="alert alert-info">
        <h2>How is the home page coming!</h2>
      </div>
    }
    <h1>Below Stuff</h1>
  `,
  styles: ``,
})
export class HomeComponent {
  service = inject(GiftDataService);

  people$ = this.service.getPeople();
}

import { Routes } from '@angular/router';
import { canMatchFeature } from '../../shared/feature-management/feature.guard';
import { GiftsComponent } from './gifts.component';
import { PeopleEntryComponent } from './pages/people-entry.component';
import { PeopleTableComponent } from './pages/people-table.component';
import { PeopleComponent } from './pages/people.component';
import { GiftDataService } from './services/gift-data.service';
import { PeopleStore } from './services/people.store';

export const GIFT_ROUTES: Routes = [
  {
    path: '',
    component: GiftsComponent,
    providers: [PeopleStore, GiftDataService],
    children: [
      {
        path: 'people',
        canMatch: [canMatchFeature('people-table-trial')],
        component: PeopleTableComponent,
      },
      {
        path: 'people',
        component: PeopleComponent,
        canActivate: [],
      },
      {
        path: 'people-entry',
        component: PeopleEntryComponent,
      },
    ],
  },
];

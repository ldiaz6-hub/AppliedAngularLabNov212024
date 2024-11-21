import { Routes } from '@angular/router';
import { AtmComponent } from './atm.component';
import { DepositComponent } from './pages/deposit.component';
import { AtmStore } from './services/atm.store';

export const ATM_ROUTES: Routes = [
  {
    path: '',
    component: AtmComponent,
    providers: [AtmStore],
    children: [
      {
        path: 'withdrawal',
        loadComponent: () =>
          import('./pages/withdrawal.component').then(
            (c) => c.WithdrawalComponent,
          ),
      },
      {
        path: 'deposit',
        component: DepositComponent,
      },
    ],
  },
];

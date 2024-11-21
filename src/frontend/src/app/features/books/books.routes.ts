import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksDataService } from './services/books-data.service';
import { BookStore } from './services/books.store';
import { ListComponent } from './pages/list.component';
import { StatsComponent } from './pages/stats.component';
import { PrefsComponent } from './pages/prefs.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksDataService, BookStore],
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

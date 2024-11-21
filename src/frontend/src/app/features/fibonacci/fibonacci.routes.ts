import { Routes } from '@angular/router'
import { FibonacciComponent } from './fibonacci.component'
import { FibonacciUiComponent } from './fib-ui.component';

export const FIBONACCI_ROUTES: Routes = [
    {
      path: '',
      component: FibonacciComponent,
      children: [
        { path: 'fibonacci-ui', component: FibonacciUiComponent },
      ],
    },
  ];
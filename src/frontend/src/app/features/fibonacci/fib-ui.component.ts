import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FibonacciService } from './fibonacci.service';

@Component({
  selector: 'app-fibonacci-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <h2>Fibonacci Sequence</h2>
      <p>{{ sequence().join(', ') }}</p>
      <button class="btn btn-success" (click)="generateNext()">
        Generate Next
      </button>
      <button class="btn btn-success" (click)="clear()">
        Clear 
      </button>
      <marquee>Do Not Forget Old HTML</marquee>
    </div>
  `,
  styles: ``,
})
export class FibonacciUiComponent {
  //    current = signal(0)
  // sequence = this.fibonacciService.current();

  // constructor(private fibonacciService: FibonacciService) {}
  constructor(
    @Inject(FibonacciService) private fibonacciService: FibonacciService,
  ) {}

  sequence = this.fibonacciService.current;

  // constructor(private fibonacciService: FibonacciService) {}

  generateNext() {
    const currentLength = this.sequence().length;
    this.fibonacciService.calculate(currentLength + 1);
  }

  clear() {
    // const currentLength = 0;
    this.fibonacciService.calculate(0) ;
  }
}

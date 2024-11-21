import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FibonacciService {
   // Create a signal to hold the Fibonacci sequence
   current = signal<number[]>([0, 1]);

   generateFibonacci(count: number): number[] {
     const sequence = [0, 1];
     for (let i = 2; i < count; i++) {
       const nextValue = sequence[i - 1] + sequence[i - 2];
       sequence.push(nextValue);
     }
     return sequence;
  }

  calculate(count: number) {
    this.current.update(() => this.generateFibonacci(count));

  }
}
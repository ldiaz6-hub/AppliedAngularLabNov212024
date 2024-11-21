import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { COUNT_BY_VALUES, CountBy } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
type CounterState = {
  current: number;
  by: CountBy;
  byOptions: typeof COUNT_BY_VALUES;
};

type SavedCounterState = Omit<CounterState, 'byOptions'>;
const initialState: CounterState = {
  current: 0,
  by: 1,
  byOptions: COUNT_BY_VALUES,
};
export const CounterStore = signalStore(
  withDevtools('counter'),
  withState<CounterState>(initialState),
  withMethods((store) => {
    return {
      setBy: (by: CountBy) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
      reset: () => patchState(store, initialState),
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.current() - store.by() < 0),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) {
          return '';
        }
        if (isFizzBuzz(current)) {
          return 'FizzBuzz';
        }
        if (isFizz(current)) {
          return 'Fizz';
        }
        if (isBuzz(current)) {
          return 'Buzz';
        }
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('counter');
      if (saved != null) {
        const state = JSON.parse(saved) as unknown as SavedCounterState;
        patchState(store, { current: state.current, by: state.by });
      }
      watchState(store, (state) => {
        const saveState: SavedCounterState = {
          by: state.by,
          current: state.current,
        };
        localStorage.setItem('counter', JSON.stringify(saveState));
      });
    },
  }),
);

function isFizz(n: number) {
  return n % 3 === 0;
}
function isBuzz(n: number) {
  return n % 5 === 0;
}

function isFizzBuzz(n: number) {
  return isFizz(n) && isBuzz(n);
}

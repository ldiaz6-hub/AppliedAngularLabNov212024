# Counter

## Sprint 1 - Create Feature and Routing

### Feature Component

Create a new folder in `src/app/features` called `counter`.

Create an Angular component in that folder called `counter.component.ts`.

In the template for this component, create a div that looks like this:

```html
<div>Counter Stuff Goes Here</div>
```

All of the content you create for this feature should be inside this div.

### Routing

In the `src/app/features/counter` folder, create a file called `counter.routes.ts`.

This should expose a `const` called `COUNTER_ROUTES` with one route defined.

- Path should be an empty string (e.g. `''`)
- Component should be the `CounterComponent`

In the `app.routes.ts` file, create a new route called `counter`, that _lazy loads_ the `./counter/counter.routes`.

Add a link the the `src/app/components/nav-bar/nav-bar.component.ts` to the Counter.

#### Check Your Work

Run your app, go to `https://localhost:4200`. You should see a link in the navigation bar called 'Counter'. Click it.

The URL should change to `http://localhost:4200/counter`.

You should see `Counter Stuff Here` on the page.

## The Counter User Interface

The `Counter` feature will have a new page that provides the user interface for our counter component.

1. In the `src/app/features/counter` folder create a new directory called `pages` and in that folder, create a new component called `ui.component.ts`.
2. In the template for this component, add the following:

```html
<div>
  <button class="btn btn-primary">-</button>
  <span data-testid="current">0</span>
  <button class="btn btn-primary">+</button>
</div>
```

3. In the `counter.routes.ts` file, add a route to this `ui.component.ts` page with the path of `ui`.
4. In the `counter.component.ts` file add a link to the `ui` path with the text of `UI`
5. Add a `<router-outlet />` inside the `div` in `counter.component.ts`

### Check Your Work

You should be able to click on the `Counter` link in the navigation bar, and then click a link in the counter that shows our rough user interface for the counter component.

In the Test Explorer (VS Code Extension), change the filter to `@playwright:@step-2` and run this test. If it passes, move on the the next step.

## Counting

In the `ui.component.ts`, the increment button and decrement button should change the value displayed in the span.

All the state should be _inside the component_ - do not use a service or signal store for this part of the lab. We are practicing using signals.

### Incrementing and Decrementing

1. Use a `signal` in the component to hold the value of the counter.
2. Display this value in the `<span data-testid="current">` element.
3. When the user clicks the increment button, the value should increase by one.
4. When the user clicks the decrement button, the value should decrease by one.

### Adding a Rule.

The user should not be able to decrement below zero.

Disable the decrement button when clicking it would cause the current value to go below zero.

(hint: consider using a `computed` here.)

#### Check Your Work

Run the app and click increment and decrement. Try not to get too fixated on this, it is a bit addictive.

## FizzBuzz

There is an old coding challenge called [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz#:~:text=Fizz%20buzz%20is%20a%20group,with%20the%20word%20%22fizzbuzz%22.).

Here are the rules:

1. If a number is evenly divisible by 3, show the word 'Fizz'.
2. If a number is evenly divisible by 5, show the word 'Buzz'.
3. If a number is evenly divisible by both 3 and 5, show 'FizzBuzz'.
4. If none of those are true, show nothing.
5. Is zero evenly divisible by 3, or 5? Too mathy for me. For our purposes, a value of zero should not return a fizzbuzz value.

In the UI component, add an element with a `data-testid="fizzBuzz"`.

Write the code in your component to display in this element the values `Fizz`, `Buzz`, `FizzBuzz` or nothing, based on the rules as the user increments and decrements the counter.

### Check Your Work

Is your component fizzbuzzing properly?

## Prefs (Advanced)

This practice is about lifting state.

In the `src/app/features/counter/pages` folder add a new component called `prefs.component.ts`.

Create a child route in the `src/apps/counter/counter.routes.ts` for this component, and add a link to it on the `counter.component.ts`.

We want to allow the user the decide what they want the increment and decrement buttons to count by. The valid options we want to allow are:

1. Users can count by 1
2. Users can count by 3
3. Users can count by 5

When they change their preference on the `prefs` component and return to the `ui` component, it should increment and decrement by their preferred value.

### Some Hints

This would be a good place for a service. I reccommend a service implemented as a SignalStore.

Move the logic and signals from the `ui` component into the signal store.

### Rubric (Gotcha)

They still should not be able to decrement below zero.

## Persistence (Advanced ++)

Make it so that whenever the user changes what they are counting by, or they increment or decrement the counter, this is stored somewhere so that when they reload the page, it "remembers" their previous state.

You could use an API for this, but to keep it simple, perhaps just store the values in the `localStorage` of the web browser.

import { Component } from '@angular/core';

@Component({
    selector: 'app-welcome',
    imports: [],
    template: `
    <div class="prose pt-12">
      <h1>Angular Starter</h1>
      <p>Using Angular 19.0.0-rc.2</p>
      <div role="alert" class="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Angular 19 is set to be released on November 19th, 2024. We will do an update during class when it releases.</span>
      </div>
      <ul>
        <li><a href="https://tailwindcss.com/">Tailwind for CSS</a></li>
        <li><a href="https://daisyui.com/">DaisyUi for UI Library</a></li>
        <li><a href="https://mswjs.io/">Mock Service Workers</a></li>
        <li><a href="https://prettier.io/">Prettier</a></li>
        <li><a href="https://eslint.org/">ESLint</a></li>
      </ul>
    </div>
  `,
    styles: ``
})
export class WelcomeComponent {}

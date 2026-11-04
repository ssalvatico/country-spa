import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-home-page',
  standalone: false,
  template: `<p>homePage works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePageComponent {}

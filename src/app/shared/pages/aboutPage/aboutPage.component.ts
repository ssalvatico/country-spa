import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-about-page',
  standalone: false,
  template: `<p>aboutPage works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AboutPageComponent {}

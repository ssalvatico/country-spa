import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-contact-page',
  standalone: false,
  template: `
  <p>contactPage works!</p>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ContactPageComponent {}

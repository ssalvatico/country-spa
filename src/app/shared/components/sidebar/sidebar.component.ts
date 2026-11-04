import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SidebarComponent {}

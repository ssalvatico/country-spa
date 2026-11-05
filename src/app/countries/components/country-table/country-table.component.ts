import { Component, Input } from '@angular/core';
import { Object } from '../../interfaces/country';

@Component({
  selector: 'app-countries-country-table',
  standalone: false,
  templateUrl: './country-table.component.html',
  styles: `
    :host {
      display: block;
    }
    img{
      width: 35px;
    }
  `,
})
export class CountryTableComponent {

  @Input()
  public countries: Object[] = [];

  test(){
    console.log(this.countries);
  }
}

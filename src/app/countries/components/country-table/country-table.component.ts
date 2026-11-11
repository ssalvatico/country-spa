import { Component, Input, OnChanges } from '@angular/core';
import { Object } from '../../interfaces/country.interface';

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
export class CountryTableComponent implements OnChanges {

  @Input()
  public countries: Object[] = [];

  // Cambia en cada nueva búsqueda, así las filas se vuelven a crear y la animación se repite
  public renderKey = 0;

  ngOnChanges(): void {
    this.renderKey++;
  }

  test(){
    console.log(this.countries);
  }
}

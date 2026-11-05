import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';

@Component({
  selector: 'app-countries-by-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  constructor(private countryService:CountriesService ){}

  searchByCountry( value:string ){
    if(!value) return;
    this.countryService.searchByTerm( value, SearchTerm.Country );
  }

  get countries(){
    return this.countryService.countries();
  }
}

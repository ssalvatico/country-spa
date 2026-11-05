import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';

@Component({
  selector: 'app-countries-by-capital-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  constructor(private countryService:CountriesService ){}

  searchByCapital( value:string ){
    if(!value) return;
    this.countryService.searchByTerm( value, SearchTerm.Capital );
  }
  get countries(){
    return this.countryService.countries();
  }
}

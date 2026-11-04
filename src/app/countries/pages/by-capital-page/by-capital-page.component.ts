import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-countries-by-capital-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  public countries: Country[] = [];

  constructor(private countryService:CountriesService ){}

  searchByCapital( value:string ){
    this.countryService.searchCapital( value )
      .subscribe( countries => {
        this.countries = countries;
      });
    console.log(this.countries);
  }
}

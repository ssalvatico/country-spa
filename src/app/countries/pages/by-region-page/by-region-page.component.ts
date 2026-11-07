import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country';

@Component({
  selector: 'app-countries-by-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;
  private countries = signal<Object[]>([]);

  public isLoading: boolean = false;
  
  constructor(private countryService:CountriesService ){}
  
  searchByRegion( value:string ){
    this.isLoading = true;
    if(!value) return;
    this.countryService.searchByTerm( value, SearchTerm.Region )
    .subscribe(countries => {
        this.isLoading = false;
        return (countries) ? this.countries.set(countries.data.objects) : [];
      });
  }

  get getCountries(): Object[]{
    // que sintaxis rara
    return this.countries.asReadonly()();
  }
}

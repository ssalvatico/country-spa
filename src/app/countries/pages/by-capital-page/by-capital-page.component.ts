import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country';

@Component({
  selector: 'app-countries-by-capital-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  private countries = signal<Object[]>([]);
  public isLoading: boolean = false;

  constructor(private countryService:CountriesService ){}

  searchByCapital( value:string ){
    this.isLoading = true
    if(!value) return;
    this.countryService.searchByTerm( value, SearchTerm.Capital )
      .subscribe(countries => {
        this.isLoading = false;
        return (countries) ? this.countries.set(countries.data.objects) : [];
      });
  }
  get getCountries(){
    return this.countries.asReadonly()();
  }
}

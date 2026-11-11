import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-by-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  private countries = signal<Object[]>([]);

  public isLoading: boolean = false;

  public initialValue = '';
  
  constructor(private countryService:CountriesService ){}
  
  searchByCountry( value:string ){
    if(!value) return;
    this.isLoading = true;
    this.countryService.searchByTerm( value, SearchTerm.Country )
    .subscribe(countries => {
        this.isLoading = false;
        return (countries) ? this.countries.set(countries.data.objects) : [];
      });
  }

  get getCountries(){
    return this.countries.asReadonly()();
  }

  ngOnInit(): void {
    console.log(this.countryService.cacheStore);
    this.initialValue = this.countryService.cacheStore.byCountry.term;
    this.countries.set(this.countryService.cacheStore.byCountry.countries);
  }
}

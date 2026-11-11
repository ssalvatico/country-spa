import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-by-capital-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  private countries = signal<Object[]>([]);
  public isLoading: boolean = false;

  public initialValue:string = '';

  constructor(private countryService:CountriesService ){}

  searchByCapital( value:string ){
    if(!value) return;
    this.isLoading = true;
    this.countryService.searchByTerm( value, SearchTerm.Capital )
      .subscribe(countries => {
        this.isLoading = false;
        return (countries) ? this.countries.set(countries.data.objects) : [];
      });
  }

  clearSearch(){ console.log('clear', SearchTerm.Capital); }

  get getCountries(){
    return this.countries.asReadonly()();
  }

  ngOnInit(): void {
    console.log(this.countryService.cacheStore);
    this.initialValue = this.countryService.cacheStore.byCapital.term;
    this.countries.set(this.countryService.cacheStore.byCapital.countries);
  }
}

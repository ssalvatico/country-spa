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

  private searchTerm = SearchTerm.Country;

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  private countries = signal<Object[]>([]);

  public isLoading: boolean = false;
  public page = 1;
  public total = 0;
  public readonly pageSize = 30;
  public initialValue = '';
  
  constructor(private countryService:CountriesService ){}
  
  searchByCountry( value:string ){
    if(!value) return;
    
    this.page = 1;
    this.fetchPage(value, 1);
  }

  changePage( page:number ){
    const term = this.countryService.cacheStore.byCountry.term;
    if(!term) return;
    this.fetchPage(term, page);
  }

  private fetchPage( value:string, page:number ){
    this.isLoading = true;
    this.countryService.searchByTerm( value, this.searchTerm, page )
      .subscribe(res => {
        this.isLoading = false;
        if(!res) return;
        this.countries.set(res.data.objects);
        this.total = res.data.meta.total;
        this.page = page;
      });
  }

  clearSearch(){
    this.page = 1;
    this.total = 0;
    this.countryService.clearCache(this.searchTerm);
    this.countries.set([]);
    this.initialValue = '';
  }

  get getCountries(){
    return this.countries.asReadonly()();
  }

  ngOnInit(): void {
    this.page = this.countryService.cacheStore.byCountry.page || 1;
    this.total = this.countryService.cacheStore.byCountry.total || 0;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
    this.countries.set(this.countryService.cacheStore.byCountry.countries);
  }
}

import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country.interface';
import { Region } from "../../interfaces/region.type";


@Component({
  selector: 'app-countries-by-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit{

  private searchTerm = SearchTerm.Region;

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;
  public isLoading: boolean = false;
  public page = 1;
  public total = 0;
  public readonly pageSize = 30;

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?:Region;

  private countries = signal<Object[]>([]);

  
  constructor(private countryService:CountriesService ){}
  
  searchByRegion( value:Region ){
    if(!value) return;
    this.selectedRegion = value;
    this.page = 1;
    this.fetchPage(value, 1);
  }

  changePage( page:number ){
    const term = this.countryService.cacheStore.byRegion.term;
    if(!term) return;
    this.fetchPage(term, page);
  }

  private fetchPage( value:Region, page:number ){
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
    this.selectedRegion = '';
  }

  get getCountries(): Object[]{
    // que sintaxis rara
    return this.countries.asReadonly()();
  }

  ngOnInit(): void {
    this.page = this.countryService.cacheStore.byRegion.page || 1;
    this.total = this.countryService.cacheStore.byRegion.total || 0;
    this.selectedRegion = this.countryService.cacheStore.byRegion.term;
    this.countries.set(this.countryService.cacheStore.byRegion.countries);
  }
}

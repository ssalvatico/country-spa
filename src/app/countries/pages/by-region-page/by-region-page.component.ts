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

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;
  public isLoading: boolean = false;

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?:Region;

  private countries = signal<Object[]>([]);

  
  constructor(private countryService:CountriesService ){}
  
  searchByRegion( value:Region ){
    if(!value) return;
    this.selectedRegion = value;
    this.isLoading = true;
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

  ngOnInit(): void {
    console.log(this.countryService.cacheStore);
    this.selectedRegion = this.countryService.cacheStore.byRegion.term;
    this.countries.set(this.countryService.cacheStore.byRegion.countries);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { SearchTerm } from '../../../../environments/env';
import { Object } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-countries-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  private _country = signal<Object | null>(null);
  public country = this._country.asReadonly();

  constructor(
    private activatedRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router: Router,
  ){}


  ngOnInit(){
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchByTerm(id, SearchTerm.AlphaCode3)),
      )
      .subscribe( country => {
        if(!country || !country.data.objects.length) {
          return this.router.navigateByUrl('');
        }
        return this._country.set(country.data.objects[0]);
      });
  };

  get getCountry(){
    return this.country();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-countries-country-page',
  standalone: false,
  styles: ``,
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  constructor( private activatedRoute:ActivatedRoute ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        console.log(id);
      });
  }
}

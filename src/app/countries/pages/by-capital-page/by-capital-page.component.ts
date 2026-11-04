import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-countries-by-capital-page',
  standalone: false,
  styles: ``,
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  searchByCapital( value:string ){
    console.log('desde by capital');
    console.log(value);
  }
}

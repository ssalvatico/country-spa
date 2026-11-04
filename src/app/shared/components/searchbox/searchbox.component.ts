import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shared-searchbox',
  standalone: false,
  templateUrl: './searchbox.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchboxComponent {

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  emitInputResult(): void{
    const searchResult = this.txtSearchInput.nativeElement.value;
    this.onValue.emit(searchResult);
    this.txtSearchInput.nativeElement.value = '';
  }
  // Esta forma no requiere declarar el txtSearchInput con ViewChild:
  // emitInputResult( value:string ): void{
  //   this.onValue.emit(value);
  //   value = '';
  // }
}

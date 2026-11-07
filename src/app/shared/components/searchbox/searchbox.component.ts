import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

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
export class SearchboxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public txtSearchInput!:ElementRef<HTMLInputElement>;

  emitInputResult(): void{
    const searchResult = this.txtSearchInput.nativeElement.value;
    this.onValue.emit(searchResult);
    this.txtSearchInput.nativeElement.value = '';
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }
  // Esta forma no requiere declarar el txtSearchInput con ViewChild:
  // emitInputResult( value:string ): void{
  //   this.onValue.emit(value);
  //   value = '';
  // }
  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(200)
      )
      .subscribe(value => {
        if(!value) return;
        this.onDebounce.emit(value);
      });
  }
}

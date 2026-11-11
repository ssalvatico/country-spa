import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

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
export class SearchboxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?:Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue = '';

  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  @Output()
  public onClear = new EventEmitter<string>();

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

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }

  clearSearch(){
    this.txtSearchInput.nativeElement.value = '';
    this.onClear.emit();
  }
  
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(200)
      )
      .subscribe(value => {
        if(!value) return;
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}

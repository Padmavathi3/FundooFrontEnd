import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private drawerState = new BehaviorSubject(false);
  currDrawerState = this.drawerState.asObservable();

  private searchString = new BehaviorSubject('');
  currSearchString = this.searchString.asObservable();

  constructor() { }

  changeDrawerState(state: boolean) {
    this.drawerState.next(state)
  }

  
  updateSearchString(state:string){
   this.searchString.next(state)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedRoomService {

  constructor() { }
  private sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();
  setData(data: any) {
    this.sharedDataSubject.next(data);
  }
  
}

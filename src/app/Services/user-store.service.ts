import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
private idIdentifier$ = new BehaviorSubject<string>("");

constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getIdIdentifierFromStore(){
    return this.idIdentifier$.asObservable();
  }

  public setIdIdentifierForStore(fullname:string){
    this.idIdentifier$.next(fullname)
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(id:string){
    this.fullName$.next(id)
  }

  
}

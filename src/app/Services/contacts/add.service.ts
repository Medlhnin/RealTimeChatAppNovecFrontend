import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from "../../models/contact.model"
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AddService {

  private baseApi:string = "https://localhost:7086/Api/Contact/";
  constructor(private http:HttpClient,private auth:AuthService) { }

  addContact(contact : Contact):Observable<Contact>{
    return this.http.post<Contact>(this.baseApi+"add",contact);
  }

  getContact(id : string):Observable<User[]>{
    return this.http.get<User[]>(this.baseApi+id);
  }
}

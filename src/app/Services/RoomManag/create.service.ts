import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chatRoom } from 'src/app/models/chatRoom.model';


@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private baseUrl: string = 'https://localhost:7086/api/chatRoom/'
  constructor(private http: HttpClient) { }
  
  create(room:chatRoom):Observable<chatRoom>{
    return this.http.post<chatRoom>(this.baseUrl+"createChatRoom",room);
  }

  join(room:chatRoom):Observable<chatRoom>{
    return this.http.post<chatRoom>(this.baseUrl+"addUser",room);
  }

  
}

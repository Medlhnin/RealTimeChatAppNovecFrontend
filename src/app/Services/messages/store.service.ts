import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl: string = 'https://localhost:7086/api/message/';

  constructor(private http: HttpClient) { }

  storeMessage(message:Message):Observable<Message>{
    return this.http.post<Message>(this.baseUrl+"storeMessage",message);
  }

  getMessages(roomId:number):Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+roomId+"/getMessage")
  }
}

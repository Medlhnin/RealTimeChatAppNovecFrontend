import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private baseApi:string = "https://localhost:7086/";
  private hubConnection: HubConnection ;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.baseApi+"chatHub")
    .build();
  }

  startConnection(){
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
      })
      .catch((err) => {
        console.error('Error while starting SignalR connection: ' + err);
      });
  }

  joinRoom(roomName: string) {
    return this.hubConnection.invoke('JoinRoom', roomName);
  }

  leaveRoom(roomName: string) {
    return this.hubConnection.invoke('LeaveRoom', roomName);
  }

  sendMessageToRoom(roomName: string, user: string, message: string) {
    return this.hubConnection.invoke('SendMessageToRoom', roomName, user, message);
  }

  onReceiveMessage(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }



  

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from 'src/app/Services/RoomManag/create.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';
import { SharedRoomService } from 'src/app/Services/shared-room.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit{
  roomToBeCreated: FormGroup ;

  roomToBeJoined: FormGroup;
  roomName:string = "" ;
  userName:string = this.auth.getfullNameFromToken(); ;
  userId:number = this.auth.getIdentifierFromToken();
  rooms:any[] = [] ;
  messages:any[] = []
  
  constructor(private auth:AuthService,private roomManagement:CreateService,private formBuilder:FormBuilder,private api:ApiService,private router:Router,private sharedRoom:SharedRoomService){
    this.roomToBeCreated = formBuilder.group({
      adminId: ['',Validators.required],
      roomName: ['',Validators.required]
    })

    this.roomToBeJoined = this.formBuilder.group({
      userId: [this.userId,Validators.required],
      roomId: ['',Validators.required]
    })
    
  }
  ngOnInit(){
    this.userName = this.auth.getfullNameFromToken();
    console.log(this.userId)
    this.api.getRooms(this.userId).subscribe({
      next: (rooms) => {
        this.rooms = rooms
        console.log(this.rooms)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  OnClickOnCreate(){
    const alertModal = document.getElementById('alertModal');
    alertModal!.style.display = 'block';
  }
  OnCloseOnCreate(){
    const alertModal = document.getElementById('alertModal');
    alertModal!.style.display = 'none';
  }
  OnClickOnJoin(){
    const alertModal2 = document.getElementById('alertModal2');
    alertModal2!.style.display = 'block';
  }
  OnCloseOnJoin(){
    const alertModal2 = document.getElementById('alertModal2');
    alertModal2!.style.display = 'none';
  }
  OnCreate(){
    this.roomManagement.create(this.roomToBeCreated.value).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.roomToBeCreated.reset();
    this.OnCloseOnCreate();
  }
  OnJoin(){
    this.roomManagement.join(this.roomToBeJoined.value).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
        console.log(this.roomToBeJoined.value)
      }
    })
    this.roomToBeJoined.reset();
    this.OnCloseOnJoin();
  }
  clickEnter(room:any){
    this.sharedRoom.setData(room.id);
    localStorage.setItem('roomId',room.id)
    this.router.navigate(['Rooms',room.name]);
  }
  SignOut()
  {
    this.auth.signOut();
  }
}

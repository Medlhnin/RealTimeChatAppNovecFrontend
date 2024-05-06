import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { StoreService } from 'src/app/Services/messages/store.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    standalone: true,
    imports: [RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule]
})
export class ChatComponent implements OnInit{

  myForm: FormGroup;
  currentUserName:string = this.auth.getfullNameFromToken();
  currentUserId:number = this.auth.getIdentifierFromToken();
  roomId :any = this.auth.getRoomId()?.toString() ;
  messages: any[] = [];

  ngOnInit(): void {
    this.messageCon.getMessages(this.roomId).subscribe({
      next: (messages) => {
        this.messages = messages
        // console.log(this.messages)
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }

  constructor(private auth:AuthService,private store:StoreService,private formBuilder: FormBuilder,private messageCon:StoreService)
  {
    this.myForm = this.formBuilder.group({
      senderId:[this.currentUserId, Validators.required],
      content:['', Validators.required],
      roomId:[this.roomId, Validators.required],
    })
  }

  SendMessage(message:any)
  {
    this.store.storeMessage(message).subscribe({
      next:(res) =>
      {
        // console.log(res)
        this.myForm.reset()
      },
      error:(err)=>
      {
        console.log(err)
      }
    })
  }

}

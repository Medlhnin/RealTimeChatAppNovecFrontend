import { AuthService } from '../../Services/auth.service';
import { ApiService } from '../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../Services/user-store.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [NgIf, NgFor]
})
export class DashboardComponent implements OnInit {

  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }

}

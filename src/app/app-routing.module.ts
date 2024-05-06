import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path:"login",
    component:AuthentificationComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"Rooms",
    component:ChatRoomsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"Rooms/:roomName",
    component:ChatComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

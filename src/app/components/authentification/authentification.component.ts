import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../Services/user-store.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-authentification',
    templateUrl: './authentification.component.html',
    styleUrls: ['./authentification.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        RouterLink,
    ],
})
export class AuthentificationComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          // console.log(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          console.log(tokenPayload);
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          // console.log(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setIdIdentifierForStore(tokenPayload.nameid);
          // console.log(tokenPayload.NameIdentifier);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(["Rooms"]);
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err);
        },
      });
    } 
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
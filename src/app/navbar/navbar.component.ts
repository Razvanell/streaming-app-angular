import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'playlistdb-app';
  postForm: FormGroup;
  loginForm: FormGroup;
    
  constructor(private router: Router, private authService: AuthService, private FormBuilder: FormBuilder) {
    this.postForm = this.FormBuilder.group({
      firstName: ["", Validators.minLength(2)],
      lastName: ["", Validators.minLength(2)],
      email: ["", Validators.minLength(5)],
      password: ["", Validators.minLength(4)],
      confirmPassword: ["", Validators.minLength(4)]
    });

    this.loginForm = this.FormBuilder.group({
      email: ["", Validators.minLength(5)],
      password: ["", Validators.minLength(4)]
    });
  }

  public onOpenNavModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button')
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal')
    if (mode === 'login') {
      button.setAttribute('data-target', '#loginUserModal');
    }
    if (mode === 'post') {
      button.setAttribute('data-target', '#postUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onLoginUser(): void {
    document.getElementById('login-user-form').click();
    this.authService.loginUser(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        let user = response.data.user;
        user.token = response.data.token;
        this.authService.setUser(user);
        this.loginForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.loginForm.reset();
      }
    );
  }

  public onPostUser(): void {
    document.getElementById('post-user-form').click();
    this.authService.postUser(this.postForm.value).subscribe(
      (response: User) => {
        this.postForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.postForm.reset();
      }
    );
  }

}


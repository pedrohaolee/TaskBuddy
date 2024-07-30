import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.router.navigate(['create-task']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login({ username, password }).subscribe(
      data => {
        localStorage.setItem('access_token', data.access);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['create-task']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}

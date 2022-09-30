import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.errorMessage = ''
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    var username = this.loginForm.get('username')?.value;
    var password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (res) => { this.router.navigate(['/form']) },
      (err) => {
        if (err.status === 401)
          this.errorMessage = 'User not found'
        else
          this.errorMessage = 'Global error on server'
      }
    );
  }
}

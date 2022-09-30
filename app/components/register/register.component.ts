import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = ''
  Roles: any = ['Private User', 'Company'];
  registerForm!: FormGroup
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")])
    })
  }

  get username() {
    return this.registerForm.get('username');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {
    var username = this.registerForm.get('username')?.value;
    var password = this.registerForm.get('password')?.value;
    var email = this.registerForm.get('email')?.value;
    var name = this.registerForm.get('name')?.value;
    var phone = this.registerForm.get('phone')?.value;
    this.authService.register(username, password, email, name, phone).subscribe(
      (res) => { this.router.navigate(['/login']) },
      (err) => {
        if (err.error.message)
          this.errorMessage = err.error.message
        else
          this.errorMessage = 'Global error on server'
      }
    );
  }

}


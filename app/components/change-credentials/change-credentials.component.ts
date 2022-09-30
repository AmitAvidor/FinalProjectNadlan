import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit {
  changeForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.changeForm = new FormGroup({
      new_username: new FormControl('',Validators.required),
      old_username: new FormControl('',Validators.required),
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('',Validators.required)
    });

}
get new_username() {
  return this.changeForm.get('new_username');
}

get old_username() {
  return this.changeForm.get('old_username');
}

get old_password() {
  return this.changeForm.get('old_password');
}

get new_password() {
  return this.changeForm.get('new_password');
}
}

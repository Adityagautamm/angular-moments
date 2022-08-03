import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { register } from 'src/app/models/registration';

import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  postForm!: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registerationData!: register;

  constructor(
    private fb: FormBuilder,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    this.registerationData = {
      firstName: this.postForm.controls['firstName']?.value,
      lastName: this.postForm.controls['lastName']?.value,
      email: this.postForm.controls['email']?.value,
      password: this.postForm.controls['password']?.value,
      confirmPassword: this.postForm.controls['confirmPassword']?.value,
    };

    this.userAuthService
      .registerUser(this.registerationData)
      .subscribe((data: any) => {
        alert(JSON.stringify(data.message));
      });
    this.postForm.reset();
  }
}

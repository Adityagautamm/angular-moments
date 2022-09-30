import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginData } from 'src/app/models/registration';
import { loginStart } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  postForm!: FormGroup;
  email: string = '';
  password: string = '';
  loginData!: loginData;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.loginData = {
      email: this.postForm.controls['email']?.value,
      password: this.postForm.controls['password']?.value,
    };
    this.store.dispatch(
      loginStart({
        email: this.postForm.controls['email']?.value,
        password: this.postForm.controls['password']?.value,
      })
    );
    this.postForm.reset();
    this.router.navigate(['/home']);
  }
}

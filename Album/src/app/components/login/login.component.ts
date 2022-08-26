import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData } from 'src/app/models/registration';
import { UserAuthService } from 'src/app/services/user-auth.service';

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
    private fb: FormBuilder,
    private userAuthService: UserAuthService,
    private route: Router
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
    this.userAuthService
      .authenticateUser(this.loginData)
      .subscribe((data: any) => {
        if (data != null) {
          localStorage.setItem('token', data.token);
        }
        this.route.navigate(['/home']);
        alert(JSON.stringify(data.message + '--Hello--' + data.name));
      });
    this.postForm.reset();
  }
}

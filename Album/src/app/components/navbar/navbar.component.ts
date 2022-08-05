import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.userAuthService.logout();
    this.route.navigate(['/']);
    alert('logout');
  }
}

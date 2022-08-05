import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private route: Router
  ) {}
  canActivate() {
    if (this.userAuthService.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}

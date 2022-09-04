import { NgIfContext } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(UserAuthService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'bearer ' + authservice.getToken(),
      },
      withCredentials: true,
    });

    return next.handle(jwtToken);
  }
}

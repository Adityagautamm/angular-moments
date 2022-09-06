import { NgIfContext } from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(public authService: UserAuthService) {}

  // let requestObject = req.clone({
  //   setHeaders: {
  //     Authorization: 'bearer ' + authservice.getToken(),
  //   },
  //   withCredentials: true,
  // });

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log(
          'enter into the response interceptor' + JSON.stringify(error)
        );
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle401Error(request, next);
          //return throwError(() => new Error('test'));
        } else {
          return throwError(() => new Error('response handler else side'));
          //(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: 'bearer ' + token,
      },
      withCredentials: true,
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('inside 401 method');
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.authService.setToken(token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}

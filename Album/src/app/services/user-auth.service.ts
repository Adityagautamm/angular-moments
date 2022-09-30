import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { credentials } from '../models/credentials';
import { accessTokenRefresh } from '../state/auth/auth.actions';
import { getToken } from '../state/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    private store: Store<{ auth: { credentialsState: credentials } }>
  ) {}

  registerUser(registrationData: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { data: registrationData };
    return this.http.post<any>('http://localhost:8000/user/signup', body);
  }

  authenticateUser(loginData: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { data: loginData };
    const paramters = new HttpParams({
      fromObject: { Credential: 'include', withCredentials: true },
    });

    return this.http.post<any>('http://localhost:8000/user/signin', body, {
      params: paramters,
    });
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  logout() {
    localStorage.removeItem('token');
    const body = {};
    const paramters = new HttpParams({
      fromObject: { Credential: 'include', withCredentials: true },
    });

    return this.http.get<any>('http://localhost:8000/logout', {
      params: paramters,
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    let token!: string;
    // this.store.select('auth').subscribe((data) => {
    //   token = data.credentialsState.token;
    // });
    //return token || '';
    //return localStorage.getItem('token') || '';

    this.store.select(getToken).subscribe((data) => {
      token = data || '';
    });
    return token;
  }

  refreshToken() {
    const body = {};
    const paramters = new HttpParams({
      fromObject: { Credential: 'include', withCredentials: true },
    });

    return this.http
      .get<any>('http://localhost:8000/refresh', {
        params: paramters,
      })
      .pipe(
        tap((response: any) => {
          console.log('response access token');
          this.store.dispatch(
            accessTokenRefresh({
              token: response.accessToken,
            })
          );
        })
      );
  }

  private getRefreshToken() {
    return 'refreshToekn-abc';
  }
}

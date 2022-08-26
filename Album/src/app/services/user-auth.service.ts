import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  registerUser(registrationData: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { data: registrationData };
    return this.http.post<any>('http://localhost:8000/user/signup', body);
  }

  authenticateUser(loginData: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { data: loginData };
    const paramters = new HttpParams({
      fromObject: { credentials: 'include', withCredentials: true },
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
    localStorage.removeItem('refreshToken');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}

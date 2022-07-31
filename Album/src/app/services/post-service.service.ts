import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse, Post } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  createPost(formData: FormData): Observable<any> {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    //const body = { post: post};
    return this.http.post<any>('http://localhost:8000/posts', formData);
  }

  getPostsList(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/posts');
  }
}

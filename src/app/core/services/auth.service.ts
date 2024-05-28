import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkPassword(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'checkPassword',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, fullname:string,birth_date: Date): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
        fullname,
        birth_date
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}

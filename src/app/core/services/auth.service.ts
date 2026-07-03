import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LoginResponse {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  accessToken: string;
  profile_picture?: string;
  banner_picture?: string;
}

export interface AuthStatusResponse {
  status: string;
  message?: string;
}

const AUTH_API = environment.API_URL+'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkPassword(username: string, password: string): Observable<AuthStatusResponse> {
    return this.http.post<AuthStatusResponse>(
      AUTH_API + 'checkPassword',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, fullname:string, birth_date: Date): Observable<AuthStatusResponse> {
    return this.http.post<AuthStatusResponse>(
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

  logout(): Observable<AuthStatusResponse> {
    return this.http.post<AuthStatusResponse>(AUTH_API + 'signout', { }, httpOptions);
  }
}

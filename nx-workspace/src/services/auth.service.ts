import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterModel, UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:7020/api/CynologyUser/login';
  private registerUrl = 'https://localhost:7020/api/CynologyUser/register';

  public constructor(private http: HttpClient) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, request)
    .pipe(map(response => {
      localStorage.setItem('accessToken', response.token);
      return response;
    }));
  }

  public isLoggedIn(){
    return localStorage.getItem('accessToken') !== null;
  }

  public register(registerObject: RegisterModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.registerUrl, registerObject);
  }
}

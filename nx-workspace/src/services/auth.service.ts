import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel, UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:7020/api/CynologyUser/login';
  private registerUrl = 'https://localhost:7020/api/CynologyUser/register';

  public constructor(private http: HttpClient) { }

  public login(loginObject: LoginModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.loginUrl, loginObject);
  }

  public register(registerObject: RegisterModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.registerUrl, registerObject);
  }
}

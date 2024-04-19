import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;
  constructor(private http: HttpClient, private router: Router){
    this.loginObj = new Login();
  }
  onLogin(){
    this.http.post("https://localhost:7020/api/CynologyUser/login", this.loginObj, { responseType: 'text' }).subscribe((res:any) =>{
      if (res && res === "You are successfully logged in") {
        alert("Successful Login");
        this.router.navigate(['/']);
      } else
        alert("Invalid Login");
    });
  }
}

export class Login{
  username: string
  password: string

  constructor(){
    this.username = "";
    this.password = "";
  }
}

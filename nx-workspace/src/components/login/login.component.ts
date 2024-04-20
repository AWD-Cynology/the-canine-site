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
      if (res) {
        alert("Successful Login");
        
        const userData = JSON.parse(res);
        
        sessionStorage.setItem('Username', userData.username);
        sessionStorage.setItem('Name', userData.name);
        sessionStorage.setItem('Surname', userData.surname);
        sessionStorage.setItem('', userData.surname);

        window.location.href = "/";
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

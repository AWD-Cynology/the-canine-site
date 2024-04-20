import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: Register;
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  registerFormIsValid: boolean = true;

  constructor(private http: HttpClient, private router: Router){
    this.registerObj = new Register();
  }

  onRegister(){
    this.registerFormIsValid = true;

    if(isEmpty(this.registerObj.username) || isEmpty(this.registerObj.password)){
      this.registerFormIsValid = false;
      // alert("Username field must not be empty");
      return;
    }

    if (this.confirmPassword !== this.registerObj.password) {
      this.passwordMismatch = true;
      // alert("Passwords do not match");
      return; // Do not proceed with registration if passwords do not match
    }

    this.http.post("https://localhost:7020/api/CynologyUser/register", this.registerObj, { responseType: 'text' }).subscribe((res:any) =>{
      if (res && res === "Registration made successfully") {
        this.router.navigate(['/login']);
      } else
        alert("Invalid register credentials!");
    });
  }
}

export class Register{
  name: string
  surname: string
  address: string
  username: string
  password: string

  constructor(){
    this.name = "";
    this.surname = "";
    this.address = "";
    this.username = "";
    this.password = "";
  }
}

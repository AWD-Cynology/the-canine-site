import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { isEmpty } from 'lodash';
import { RegisterModel, UserModel } from '../../models/user.model';
import { ApiService } from '../../services/api-service.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerObject: RegisterModel = new RegisterModel();
  public confirmPassword: string = '';
  public passwordMismatch: boolean = false;
  public registerFormIsValid: boolean = true;

  public constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  public onRegister(){
    this.registerFormIsValid = true;

    if(isEmpty(this.registerObject.username) || isEmpty(this.registerObject.password)){
      this.registerFormIsValid = false;
      return;
    }

    if (this.confirmPassword !== this.registerObject.password) {
      this.passwordMismatch = true;
      return; // Do not proceed with registration if passwords do not match
    }

    this.apiService.register(this.registerObject).subscribe({
      next: (result: UserModel) => {
        console.log(result);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
        alert("Invalid register credentials!");
      }
    });
  }
}

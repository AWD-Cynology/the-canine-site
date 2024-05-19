import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { isEmpty } from 'lodash';
import { RegisterModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, HttpClientModule, CommonModule, WrapperComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerObject: RegisterModel = new RegisterModel();
  public confirmPassword: string = '';
  public passwordMismatch: boolean = false;
  public registerFormIsValid: boolean = true;
  public isLoading = false;

  public constructor(private router: Router, private authService: AuthService) { }

  public onRegister(){
    this.isLoading = true;
    this.registerFormIsValid = true;

    if(isEmpty(this.registerObject.username) || isEmpty(this.registerObject.password)){
      this.registerFormIsValid = false;
      this.isLoading = false;
      return;
    }

    if (this.confirmPassword !== this.registerObject.password) {
      this.passwordMismatch = true;
      this.isLoading = false;
      return; // Do not proceed with registration if passwords do not match
    }

    this.authService.register(this.registerObject).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isLoading = false;
        alert("Invalid register credentials!");
      }
    });
  }
}

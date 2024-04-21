import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { isEmpty } from 'lodash';
import { RegisterModel, UserModel } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';

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

  public constructor(private router: Router, private apiService: ApiService, private loadingService: LoadingService) { }

  public onRegister(){
    this.loadingService.setLoadingState(true);
    this.registerFormIsValid = true;

    if(isEmpty(this.registerObject.username) || isEmpty(this.registerObject.password)){
      this.registerFormIsValid = false;
      this.loadingService.setLoadingState(false);
      return;
    }

    if (this.confirmPassword !== this.registerObject.password) {
      this.passwordMismatch = true;
      this.loadingService.setLoadingState(false);
      return; // Do not proceed with registration if passwords do not match
    }

    this.apiService.register(this.registerObject).subscribe({
      next: (result: UserModel) => {
        this.loadingService.setLoadingState(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        alert("Invalid register credentials!");
      }
    });
  }
}

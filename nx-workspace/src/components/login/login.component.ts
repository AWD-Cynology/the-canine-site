import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRequest, UserModel } from '../../models/user.model';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginObject: LoginRequest = {
    username: "",
    password: ""
  };

  public constructor(private authService: AuthService, private loadingService: LoadingService) {}

  public isLoggedIn(){return this.authService.isLoggedIn();}

  public onLogin() {
    this.loadingService.setLoadingState(true);
    this.authService.login(this.loginObject).subscribe({
      next: (result: any) => {
        sessionStorage.setItem('Username', result.userSession.username);
        sessionStorage.setItem('Name', result.userSession.name);
        sessionStorage.setItem('Surname', result.userSession.surname);

        window.location.href = '/';
      },
      error: error => {
        this.loadingService.setLoadingState(false);
        alert('Invalid login credentials');
      }
    });
  }
}

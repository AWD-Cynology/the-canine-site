import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRequest } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, HttpClientModule, WrapperComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginObject: LoginRequest = {
    username: "",
    password: ""
  };
  public isLoading = false;

  public constructor(private authService: AuthService) {}

  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  public onLogin() {
    this.isLoading = true;
    this.authService.login(this.loginObject).subscribe({
      next: (result: any) => {
        localStorage.setItem('Username', result.userSession.username);
        localStorage.setItem('Name', result.userSession.name);
        localStorage.setItem('Surname', result.userSession.surname);

        window.location.href = '/';
      },
      error: () => {
        this.isLoading = false;
        alert('Invalid login credentials');
      }
    });
  }
}

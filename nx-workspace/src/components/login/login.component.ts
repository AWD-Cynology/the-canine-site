import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'
import { LoginModel, UserModel } from '../../models/user.model';
import { LoadingService } from '../../services/loading.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginObject: LoginModel = new LoginModel();

  public constructor(private router: Router, private loginService: LoginService, private loadingService: LoadingService) {}

  public onLogin() {
    this.loadingService.setLoadingState(true);
    this.loginService.login(this.loginObject).subscribe({
      next: (result: UserModel) => {
        sessionStorage.setItem('Username', result.username);
        sessionStorage.setItem('Name', result.name);
        sessionStorage.setItem('Surname', result.surname);

        this.router.navigate(['/']);
      },
      error: error => {
        this.loadingService.setLoadingState(false);
        alert('Invalid login credentials');
      }
    });
  }
}

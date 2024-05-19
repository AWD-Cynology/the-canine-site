import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../services/jwt-interceptor';
import { WrapperComponent } from '../components/wrapper/wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatProgressSpinnerModule, CommonModule, WrapperComponent ],
  providers:[ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public username: string = '';
  public name: string = '';
  public surname: string = '';
  public title: string = 'The Canine Site';
  public isLoading = false;

  public constructor() { }

  public ngOnInit(): void {
    this.isLoading = true;
    
    if (typeof localStorage !== 'undefined') {
      this.username = localStorage.getItem('Username') || '';
      this.name = localStorage.getItem("Name") || '';
      this.surname = localStorage.getItem("Surname") || '';
    }

    this.isLoading = false;
  }

  public onLogout(){
    this.isLoading = true;
    localStorage.clear();
    
    window.location.href = '/';
  }
}

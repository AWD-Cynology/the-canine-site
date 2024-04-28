import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../services/jwt-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatProgressSpinnerModule, CommonModule ],
  providers:[ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public username: string = '';
  public name: string = '';
  public surname: string = '';
  public title: string = 'The Canine Site';

  public constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.username = (sessionStorage.getItem('Username') || "");
      this.name = (sessionStorage.getItem("Name") || "");
      this.surname = (sessionStorage.getItem("Surname") || "");
    }
  }

  public onLogout(){
    sessionStorage.clear();
    localStorage.clear();

    window.location.href = '/';
  }
}

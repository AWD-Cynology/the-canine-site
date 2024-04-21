import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatProgressSpinnerModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public username: string = '';
  public name: string = '';
  public surname: string = '';
  public title: string = 'The Canine Site';
  public isLoading: boolean = false;
  private loading$: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private loadingService: LoadingService, private router: Router) {
    this.loading$ = this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.username = (sessionStorage.getItem('Username') || "");
      this.name = (sessionStorage.getItem("Name") || "");
      this.surname = (sessionStorage.getItem("Surname") || "");
    }
  }

  public ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }

  onLogout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }
}

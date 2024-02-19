import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatProgressSpinnerModule, CommonModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public username: string = '';
  public title: string = 'The Canine Site';
  public isLoading: boolean = false;
  private loading$: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private loadingService: LoadingService) {
    this.loading$ = this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let user = (localStorage.getItem('username') || "");
      this.username = user;
    }
  }

  public ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }
}

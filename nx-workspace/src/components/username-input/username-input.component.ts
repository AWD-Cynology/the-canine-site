import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  submitUsername(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUsername = localStorage.getItem('Username');
      if (storedUsername) {
        this.router.navigate(['/home']);
        return;
      }
    } else {
      console.error('localStorage is not available on the server-side.');
    }
  }
}

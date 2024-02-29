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
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  submitUsername(): void {
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    if (isPlatformBrowser(this.platformId)) {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (storedUsername && storedPassword) {
        this.router.navigate(['/home']);
        return;
      }
      if (username || password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.router.navigate(['/home']);
      } else {
        alert('Please enter a username and password');
      }
    } else {
      console.error('localStorage is not available on the server-side.');
    }
  }
}

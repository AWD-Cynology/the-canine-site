import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      const username = localStorage.getItem('username');
      if (!username) {
        this.router.navigate(['/enter-username']);
        return false;
      }
      return true;
    } 
    return false
  }
}
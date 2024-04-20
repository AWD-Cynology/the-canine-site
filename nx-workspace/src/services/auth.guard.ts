import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      const username = sessionStorage.getItem('Username');
      if (!username) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } 
    return false
  }
}

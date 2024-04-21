import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(private router: Router) {}

  public canActivate(): boolean {
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

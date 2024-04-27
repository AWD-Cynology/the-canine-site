import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(private router: Router) {}

  public canActivate(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

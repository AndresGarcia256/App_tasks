import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}
  //Esta funcion permite revisar si la sesion  sigue activa 
  canActivate(): Observable<boolean> {
    return this.auth.checkSession().pipe(
      map(isValid => {
        if (isValid) return true;
        return false; 
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
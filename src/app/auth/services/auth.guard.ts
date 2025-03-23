import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return authState(this.auth).pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn && state.url.startsWith('/tabs')) {
          this.router.navigate(['/login']);
        }
        else if (!loggedIn && state.url !== '/login'){
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
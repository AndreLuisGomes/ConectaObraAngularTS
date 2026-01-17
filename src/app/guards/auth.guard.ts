import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private authService : AuthService){

  }
  canActivate(): boolean | UrlTree {
    return this.authService.usuarioEstaLogado() ? true : this.router.createUrlTree(['/auth/fazer-login'])
  }
}

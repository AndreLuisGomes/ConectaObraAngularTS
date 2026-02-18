import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/authResponse';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler, router = inject(Router)): Observable<HttpEvent<any>> {

        let usuario = localStorage.getItem('usuario');

        if (usuario) {
            const usuarioObject = JSON.parse(usuario) as AuthResponse;
            let token: string | null = usuarioObject.acessToken;
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
            return next.handle(authReq);
        }
        router.navigate(['/auth/fazer-login'])
        return next.handle(req);
    }
}
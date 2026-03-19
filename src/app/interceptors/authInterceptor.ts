import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/authResponse';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ApiError } from '../models/errors/error';

export class AuthInterceptor implements HttpInterceptor {

    private quantTentativas = 0;

    intercept(req: HttpRequest<any>, next: HttpHandler, router = inject(Router), authService = inject(AuthService)): Observable<HttpEvent<any>> {
        
        console.log("AuthInterceptor -> intercept() : Passando pelo AuthInterceptor");
        
        if (
            req.url == environment.apiLoginUrl ||
            req.url == environment.apiRefreshTokenUrl ||
            req.url == environment.apiRefreshTokenUrl
        ) { 
            console.log("AuthInterceptor -> intercept() : A requisição é de login ou refreshToken")
            return next.handle(req);
        }
        
        let usuario = authService.obterUsuarioDoStorage();

        if (!usuario?.accessToken || !usuario?.refreshToken) {
            console.log("AuthInterceptor -> intercept() : Não possui valores de 'acessToken' e 'refreshToken'");
            authService.deslogar();
            return next.handle(req);
        }
        console.log('AuthInterceptor -> intercept() : Não passou pelo if, não é uma requisição de autenticação')
        let novaReq = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${authService.obterUsuarioDoStorage()?.accessToken}`
            }
        })

        return next.handle(novaReq).pipe(
            catchError((err : ApiError) => {
                this.quantTentativas++;

                if (this.quantTentativas > 3) {
                    authService.deslogar();
                    this.quantTentativas = 0;
                    return throwError(() => new Error('AuthInterceptor -> intercept() : Loop de autenticação detectado e interrompido.'));
                }

                if (err.status === 401) {
                    this.lidarCom401(novaReq, next, authService, usuario);
                }
                return throwError(() => { err });
            })
        )
    }

    lidarCom401(req: HttpRequest<any>, next: HttpHandler, authService: AuthService, usuario : AuthResponse) {
        console.log("AuthInterceptor -> lidarCom401() : Passando pelo lidar com 401");
        authService.refreshToken(authService.obterUsuarioDoStorage()?.refreshToken!)
        .pipe(catchError((err : ApiError) => {
            console.log("AuthInterceptor -> lidarCom401() : Deu erro no refreshToken");
            if(err.status == 401){
                authService.deslogar();
            } 
            return throwError( () => err)
        }))
        .subscribe({
            next: (refreshToken) => {
                console.log("AuthInterceptor -> lidarCom401 : Definindo novos tokens no Storage e enviando requisição com headers válidos");
                authService.definirNovosTokens(refreshToken.accessToken, refreshToken.refreshToken);
                next.handle(req.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${authService.obterUsuarioDoStorage()?.accessToken}`
                    }
                }))
            }
        })
    }
}
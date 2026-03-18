import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthResponse } from '../models/authResponse';
import { LoginRequest } from '../models/loginRequest';
import { RefreshTokenResponse } from '../models/refreshTokenResponse';
import { LayoutComponent } from '../template/layout/layout.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://localhost:8080/auth';
  
  constructor(private route: Router, private http: HttpClient) {
  }
  
  usuarioLogado = signal<AuthResponse | null>(this.obterUsuarioDoStorage());
  usuarioEstaLogado = computed(() => !!this.usuarioLogado());
  public usuario = this.usuarioLogado.asReadonly();
  
  logar(usuarioLoginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiLoginUrl, usuarioLoginRequest)
    .pipe(tap((authResponse) => {
      this.usuarioLogado.set(authResponse)
      this.definirUsuario(authResponse)
    }))
  }

  refreshToken(refreshToken : string) : Observable<RefreshTokenResponse>{
    return this.http.post<RefreshTokenResponse>(`${environment.apiRefreshTokenUrl}`, refreshToken);
  }

  // refreshToken(refreshToken : string) : void{
  //   this.http.post<RefreshTokenResponse>(`envinronment.refreshTokenUrl`, refreshToken)
  //   .subscribe({
  //     next: (refreshTokenResponse : RefreshTokenResponse) => {
  //       this.definirNovosTokens(refreshTokenResponse.accessToken, refreshTokenResponse.refreshToken);
  //     },
  //     error: (err : HttpErrorResponse) => {
  //       if(err.status === 401){
  //         this.deslogar();
  //       }
  //     }
  //   })
  // }

  definirNovosTokens(acessToken : string, refreshToken : string) : void{
    let usuario = this.obterUsuarioDoStorage();
    if(usuario){
      usuario.accessToken = acessToken;
      usuario.refreshToken = refreshToken;
    }
  }

  definirUsuario(usuario : AuthResponse){
    localStorage.setItem(environment.usuarioStorage, JSON.stringify(usuario));
  }

  deslogar(){
    localStorage.removeItem(environment.usuarioStorage);
    this.usuarioLogado.set(null);
    this.route.navigate([environment.fazerLoginUrl]);
  }

  obterUsuarioDoStorage() : AuthResponse | null{
    let usuario = localStorage.getItem(environment.usuarioStorage);
    if(usuario != null){
      let authResponse = JSON.parse(usuario) as AuthResponse;
      return authResponse;
    }
    return null;
  }
}

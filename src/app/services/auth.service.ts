import { computed, inject, Injectable, signal, Signal, Type } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, UsuarioLoginRequest } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

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

  logar(usuarioLoginRequest: UsuarioLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/logar`, usuarioLoginRequest)
    .pipe(tap((authResponse) => {
      this.usuarioLogado.set(authResponse)
      localStorage.setItem('usuario', JSON.stringify(authResponse))
    }))
  }

  deslogar(){
    this.usuarioLogado.set(null);
    localStorage.removeItem('')
  }

  obterUsuarioDoStorage() : AuthResponse | null{
    let usuario = localStorage.getItem('usuario');
    if(usuario != null){
      let authResponse = JSON.parse(usuario) as AuthResponse;
      return authResponse;
    }
    return null;
  }
}

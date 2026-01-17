import { computed, inject, Injectable, signal, Signal, Type } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, UsuarioLoginRequest } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://localhost:8080/auth';

  constructor(private route: Router, private http: HttpClient) {

  }

  usuario = signal<AuthResponse | null>(null);

  usuarioEstaLogado = computed(() => (!!this.usuario()));

  logar(usuarioLoginRequest: UsuarioLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/logar`, usuarioLoginRequest);
  }

  deslogar(){
    this.usuario.set(null);
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

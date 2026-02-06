// import { HttpClient } from '@angular/common/http';
// import { computed, Injectable, signal } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthResponse } from '../models/usuario';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {

//   usuario = signal<AuthResponse | null>(null);

//   usuarioLogado = computed(() => { !!this.usuario() });

//   constructor(private httpClient: HttpClient) {
//   }

//   apiUrl = 'http://localhost:8080';

//   logar(usuarioLoginRequest: any): Observable<AuthResponse> {
//     return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/login`, { usuarioLoginRequest })
//   }

//   deslogar() {
//     localStorage.clear();
//     this.usuario.set(null);
//   }

//   definirUsuario(authResponse: AuthResponse) {
//     localStorage.setItem('usuario', JSON.stringify(authResponse));
//     this.usuario.set(authResponse);
//   }
// }

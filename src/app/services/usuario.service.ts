import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, UsuarioLoginRequest } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioLoginRequest? : UsuarioLoginRequest;

  constructor(private httpClient : HttpClient) { 

  }

  apiUrl = 'http://localhost:8080';

  logar() : Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/usuarios/logar`, this.usuarioLoginRequest)
  }
}

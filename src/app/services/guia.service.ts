import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Guia } from '../models/guia';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  apiUrl = environment.apiUrl + '/guias';

  constructor(private http : HttpClient) {

  }

  obterGuiasPorParametro(
    local : string | null,
    nome : string | null, 
    guiaStatus : string | null,
    nomeCliente : string |  null
  ): Observable<Guia[]>{

    let params = new HttpParams();

    if(local){
      params.set('local', local)
    }
    if(nome){
      params.set('nome', nome)
    }
    if(guiaStatus){
      params.set('guiaStatus', guiaStatus)
    }
    if(nomeCliente){
      params.set('nomeCliente', nomeCliente)
    }

    return this.http.get<Guia[]>(this.apiUrl, {params: params})
  }
}

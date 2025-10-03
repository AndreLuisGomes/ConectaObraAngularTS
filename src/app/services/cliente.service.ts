import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ClienteService{

    apiUrl = environment.apiUrl + '/clientes';

    constructor(private http : HttpClient){
    }

    cadastrarCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    obterClientes() : Observable<Cliente[]>{
        return this.http.get<Cliente[]>(this.apiUrl)
    }

}
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";
import { HttpClient, HttpParams} from "@angular/common/http";
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

    obterClientesPorParametro(
        nome: string | null,
        contato: string | null, 
        localizacaoSede: string | null
    ) : Observable<Cliente[]>{

        let params = new HttpParams();

        if(nome){
            params = params.set("nome", nome)
        }
        if(contato){
            params = params.set("contato", contato)
        }
        if(localizacaoSede){
            params = params.set("localizacaoSede", localizacaoSede)
        }

        return this.http.get<Cliente[]>(this.apiUrl, {params: params})
    }

    deletarClientePorId(clienteId: string): Observable<void>{
        console.log(clienteId);
        return this.http.delete<void>(`${this.apiUrl}/${clienteId}`);
    }
}
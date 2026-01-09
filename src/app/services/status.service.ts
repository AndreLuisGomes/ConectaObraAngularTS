import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  obterValores(): string[]{
    const lista : string[] = ['Em projeção', 'Cortando', 'Fabricando', 'Em análise', 'Finalizado', 'Cancelado']
    return lista;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private titulo = new BehaviorSubject<string>('');

  titulo$ = this.titulo.asObservable();

  definirTitulo(titulo : string){
    this.titulo.next(titulo);
  }

  constructor() { }
}

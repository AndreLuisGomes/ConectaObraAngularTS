import { Injectable } from '@angular/core';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root'
})
export class SuporteService {

  constructor(private layoutService: LayoutService) {
    this.layoutService.definirTitulo('Suportes')
  }
}

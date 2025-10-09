import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Guia } from '../../models/guia';
import { GuiaService } from '../../services/guia.service';

@Component({
  selector: 'app-guia',
  standalone: false,
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.scss'
})
export class GuiaComponent implements OnInit {

  guias : Guia[] = [];

  constructor(
    private guiaService: GuiaService, private layoutService : LayoutService){
    this.layoutService.definirTitulo('Listar Guias')

  }

  ngOnInit(): void {
    
  }
}

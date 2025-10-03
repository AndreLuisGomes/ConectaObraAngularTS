import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-suporte',
  standalone: false,
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.scss'
})

export class SuporteComponent implements OnInit {

  camposForm: FormGroup;

  constructor(private layoutService : LayoutService){

    this.camposForm = new FormGroup({
      tag : new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.layoutService.definirTitulo('Listar Suportes')
  }

  pesquisar(){
    console.log(this.camposForm.valid)
  }
}

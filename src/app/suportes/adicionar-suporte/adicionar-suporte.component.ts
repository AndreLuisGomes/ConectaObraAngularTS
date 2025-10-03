import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, NgModel, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-adicionar-suporte',
  standalone: false,
  templateUrl: './adicionar-suporte.component.html',
  styleUrl: './adicionar-suporte.component.scss'
})
export class AdicionarSuporteComponent implements OnInit{

  camposForm : FormGroup;

  constructor(private layoutService : LayoutService){
    this.camposForm = new FormGroup({
      nome : new FormControl(null, Validators.required),
      tag: new FormControl(null, Validators.required),
      descricao : new FormControl(null, Validators.required),
      guia: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.layoutService.definirTitulo('Adicionar Novo Suporte');

  }

  verificarCampos(campo : string): boolean{
    const control = this.camposForm.get(campo)
    return !!(control && control?.valid && (control.dirty || control?.touched));
  }
}

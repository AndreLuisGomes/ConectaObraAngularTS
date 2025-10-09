import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adicionar-guia',
  standalone: false,
  templateUrl: './adicionar-guia.component.html',
  styleUrl: './adicionar-guia.component.scss'
})
export class AdicionarGuiaComponent implements OnInit{

  cadastrado : string = ''
  camposForm: FormGroup;

  constructor(private layoutService: LayoutService, private http: HttpClient){
    this.layoutService.definirTitulo('Cadastro de Guias')
    this.camposForm = new FormGroup<any>({
      local : new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      guiaStatus: new FormControl(null, Validators.required),
      clienteId: new FormControl(null, Validators.required)
    })
  }
  
  ngOnInit(): void {
  
  }

  cadastrarGuia(){
    this.camposForm.markAllAsTouched()

    if(this.camposForm.valid){

    }
  }

  verificarCampos(valor : string) : boolean{
    const campo = this.camposForm.get(valor);
    return !!campo && campo?.invalid && (campo.dirty || campo?.touched)  
  }
}

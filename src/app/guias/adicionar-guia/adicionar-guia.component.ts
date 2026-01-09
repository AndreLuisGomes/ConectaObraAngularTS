import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';
import { StatusService } from '../../services/status.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-adicionar-guia',
  standalone: false,
  templateUrl: './adicionar-guia.component.html',
  styleUrl: './adicionar-guia.component.scss'
})
export class AdicionarGuiaComponent implements OnInit{

  clientes : string[] = [];
  status : string[];
  cadastrado : string = ''
  camposForm: FormGroup;

  constructor(private statusService: StatusService, private layoutService: LayoutService, private clienteService: ClienteService){
    this.status = this.statusService.obterValores();
    this.layoutService.definirTitulo('Cadastro de Guias')
    this.camposForm = new FormGroup<any>({
      localizacao : new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      clienteNome: new FormControl(null, Validators.required)
    })
  }
  
  ngOnInit(): void {
    this.obterNomeDeClientes();
  }

  obterNomeDeClientes(){
    this.clienteService.obterClientesPorParametro(null, null, null)
      .pipe(map((clientes: Cliente[]) => {
        return clientes.map(clientes => clientes.nome);
      })
    ).subscribe({
      next: (nomes: string[]) => {
        this.clientes = nomes;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err)
      }
    })
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

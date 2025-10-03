import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit{

    cadastrado = ''
    clientes : Cliente[] = []
    camposForm : FormGroup;

    constructor(private clienteService : ClienteService ,private layoutService : LayoutService){

    this.camposForm = new FormGroup<any>({
      nome : new FormControl(null , Validators.required),
      contato : new FormControl(null , Validators.required),
      localizacaoSede : new FormControl(null , Validators.required)
    } as any); // Adiciona 'as any' ou ajusta o tipo para a versão mais antiga do Angular
  }

  ngOnInit(): void {
    this.layoutService.definirTitulo('Cadastrar Clientes');
    this.clienteService.obterClientes().subscribe({
      next: cliente => this.clientes.push(cliente as Cliente)
    })
  }

  cadastrarCliente() : void{

    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      this.clienteService.cadastrarCliente(this.camposForm.value as Cliente).subscribe({
        next: (cliente) => {this.camposForm.reset(), this.cadastrado = `Cliente ${cliente.nome} Cadastrado com Sucesso!`},
        error: erro => this.cadastrado = "Erro ao cadastrar Cliente, tente novamente!"
      })
    }
  }

  verificarCampos(campo : string){
    const control = this.camposForm.get(campo);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}

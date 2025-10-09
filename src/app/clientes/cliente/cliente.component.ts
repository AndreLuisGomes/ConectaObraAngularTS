import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteDTO } from '../../models/dtos/clienteDTO';
import { ClienteService } from '../../services/cliente.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent implements OnInit {
  
  filtros : ClienteDTO = {
    nome : '',
    contato : '',
    localizacaoSede : ''
  }

  cadastrado = '';
  clientes: Cliente[] = [];
  camposForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private layoutService: LayoutService
  ) {
    this.camposForm = new FormGroup<any>({
      nome: new FormControl(null, Validators.required),
      contato: new FormControl(null, Validators.required),
      localizacaoSede: new FormControl(null, Validators.required),
    } as any); // Adiciona 'as any' ou ajusta o tipo para a versão mais antiga do Angular
  }

  ngOnInit(): void {
    this.layoutService.definirTitulo('Listar Clientes');
    this.listarClientes();
  }

  listarClientes(): void {

    const { nome, contato, localizacaoSede } = this.filtros;

    this.clienteService.obterClientesPorParametro(
      nome.trim() || null,
      contato.trim() || null,
      localizacaoSede.trim() || null
    ).subscribe({
      next: (lista) => {
        this.clientes = lista;
      },
      error: (erro) => console.error(erro),
    });
  }

  cadastrarCliente(): void {
    this.ngOnInit();
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.clienteService
        .cadastrarCliente(this.camposForm.value as Cliente)
        .subscribe({
          next: (cliente) => {
            this.camposForm.reset(),
              (this.cadastrado = `Cliente ${cliente.nome} Cadastrado com Sucesso!`);
          },
          error: (erro) =>
            (this.cadastrado = 'Erro ao cadastrar Cliente, tente novamente!'),
        });
    }
  }

  verificarCampos(campo: string) {
    const control = this.camposForm.get(campo);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }

  apagarCliente(cliente: string): void {
    console.log(cliente);
    this.clienteService.deletarClientePorId(cliente).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    }
    );
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-adicionar-cliente',
  standalone: false,
  templateUrl: './adicionar-cliente.component.html',
  styleUrl: './adicionar-cliente.component.scss',
})
export class AdicionarClienteComponent {

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
    this.layoutService.definirTitulo('Cadastrar Clientes');
  }

  cadastrarCliente(): void {
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
}

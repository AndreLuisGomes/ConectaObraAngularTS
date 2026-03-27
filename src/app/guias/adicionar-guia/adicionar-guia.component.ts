import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';
import { StatusService } from '../../services/status.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { map, Observable } from 'rxjs';
import { GuiaService } from '../../services/guia.service';
import { Guia } from '../../models/guia';
import { ClienteGuiaDTO } from '../../models/dtos/clienteGuiaDTO';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-adicionar-guia',
  standalone: false,
  templateUrl: './adicionar-guia.component.html',
  styleUrl: './adicionar-guia.component.scss'
})
export class AdicionarGuiaComponent implements OnInit {

  status: string[];
  clienteService = inject(ClienteService);
  cadastrado: string = ''
  camposForm: FormGroup;
  guiaService = inject(GuiaService);
  mensagemFeedback: string = '';
  
  clientes = toSignal(this.clienteService.obterClientesPorParametro(null, null, null), {initialValue : []});
  
  constructor(private statusService: StatusService, private layoutService: LayoutService) {
    this.status = this.statusService.obterValores();
    this.layoutService.definirTitulo('Cadastro de Guias')
    this.camposForm = new FormGroup<any>({
      localizacao: new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      clienteNome: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  cadastrarGuia() {
    this.camposForm.markAllAsTouched()

    if (this.camposForm.valid) {
      this.guiaService.salvarGuia(this.camposForm.value() as Guia).subscribe({
        next: (guia) => {
          this.mensagemFeedback = guia.nome;
        },
        error: (err) => {
          this.mensagemFeedback = 'Erro ao cadastrar guia, tente novamente!';
        }
      })
    }
  }

  verificarCampos(valor: string): boolean {
    const campo = this.camposForm.get(valor);
    return !!campo && campo?.invalid && (campo.dirty || campo?.touched)
  }
}
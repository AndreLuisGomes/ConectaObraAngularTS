import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuiaDTO } from '../../models/dtos/guiaDTO';
import { ClienteService } from '../../services/cliente.service';
import { GuiaService } from '../../services/guia.service';
import { LayoutService } from '../../services/layout.service';
import { StatusService } from '../../services/status.service';
import { ApiError } from '../../models/errors/error';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  mensagemFeedback = signal<string>("");

  clientes = toSignal(this.clienteService.obterClientesPorParametro(null, null, null), { initialValue: [] });

  constructor(private statusService: StatusService, private layoutService: LayoutService) {
    this.status = this.statusService.obterValores();
    this.layoutService.definirTitulo('Cadastro de Guias')
    this.camposForm = new FormGroup<any>({
      nome: new FormControl(null, Validators.required),
      status: new FormControl("", Validators.required),
      clienteId: new FormControl("", Validators.required),
      local: new FormControl(null, Validators.required)
    })
    console.log('Valor do camposForm: ', this.camposForm.get('status')?.value)
  }

  ngOnInit(): void {
  }

  cadastrarGuia() {
    this.camposForm.markAllAsTouched()
    console.log(this.camposForm.get('status')?.value)
    if (this.camposForm.valid) {
      this.guiaService.salvarGuia(this.camposForm.value as GuiaDTO).subscribe({
        next: () => {
          let nome = this.camposForm.get('nome')?.value
          this.mensagemFeedback.set("Guia cadastrada: " + nome);
          console.log("Deu foi certo, bobão!")
        },
        error: (err) => {
          console.log("Não deu certo!");
          this.mensagemFeedback.set(err.error.mensagem);
        }
      })
    }
  }

  verificarCampos(valor: string): boolean {
    const campo = this.camposForm.get(valor);
    return !!campo && campo?.invalid && (campo.dirty || campo?.touched)
  }

  exibirValorCampos(valor: string) {
    const campo = this.camposForm.get(valor);
    return campo?.getRawValue;
  }
}
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiError } from '../models/errors/error';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  carregando = signal<boolean>(false);
  // botaoLogar = computed(() => this.btnLogar());
  senhaValida = signal<boolean>(true);
  mensagemErro = signal<string>("");
  loginForm!: FormGroup;
  mostrarSenhaBool: boolean = false;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    })
  }

  logar() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.carregando.set(true);
      console.log('Entrando no If')
      this.authService.logar(this.loginForm.value).subscribe({
        next: () => {
          console.log('Entrando no next')
          this.router.navigate(['/suportes']);
        },
        error: (err: ApiError) => {
          if(err.status === 401){
            this.mensagemErro.set('Usuário ou senha inválidos!')
          }else {
            this.mensagemErro.set('Erro desconhecido!')
          }
          console.error(err);
        }
      })
      this.carregando.set(false);
    }
  }

  campoEstaValido(campoNome: string): boolean {
    const campo = this.loginForm.get(campoNome);
    return !!campo && campo?.valid && (campo?.touched || campo?.dirty)
  }

  mostrarSenha() {
    this.mostrarSenhaBool = !this.mostrarSenhaBool;
  }
}
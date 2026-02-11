import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  btnLogar = signal<boolean>(true);
  senhaValida = signal(true);
  usuarioErro = signal<number>(0);
  loginForm!: FormGroup;
  mostrarSenhaBool: boolean = false;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  logar(): null | UrlTree {
    this.loginForm.markAllAsTouched();
    console.log('Entrando no logar');

    if (!!this.loginForm.valid) {
      console.log('Entrando no If')
      this.btnLogar.set(false);
      this.authService.logar(this.loginForm.value).subscribe({
        next: () => {
          console.log('Entrando no next')

          this.btnLogar.set(true)
          return this.router.createUrlTree(['/clientes'])
        },
        error: (err) => {
          console.error(err);
          this.btnLogar.set(true);
        }
      })
    }
    this.usuarioErro.set(1);
    console.log('Deu errado!')
    return null;
  }

  campoEstaValido(campoNome: string): boolean {
    const campo = this.loginForm.get(campoNome);
    return !!campo && campo.valid && (campo?.touched || campo?.dirty)
  }

  mostrarSenha() {
    this.mostrarSenhaBool = !this.mostrarSenhaBool;
  }
}
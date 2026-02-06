import { Component, computed, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, UsuarioLoginRequest } from '../models/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  btnLogar = signal<boolean>(true);
  senhaValida = signal(true);
  usuarioErro = 0;
  loginForm! : FormGroup; 
  mostrarSenhaBool: boolean = false;
  authService: AuthService = inject(AuthService);
  router : Router = inject(Router);

  constructor(){
    this.loginForm = new FormGroup({
      nome : new FormControl<string>('', [Validators.required]),
      senha :  new FormControl<string>('', [Validators.required])
    })
  }

  logar(){
    this.loginForm.markAllAsTouched();

    const loginForm = this.loginForm.getRawValue() as UsuarioLoginRequest;

    if(this.loginForm.valid){
      this.btnLogar.set(false);
      this.authService.logar(loginForm).subscribe({
        next: (authResponse) => {        
          this.btnLogar.set(true)
          // this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error(err);
          this.btnLogar.set(false);
        }
      })
    }else{
      this.usuarioErro = 1;
    }
  }

  campoEstaValido(campoNome : string) : boolean{
    const campo = this.loginForm.get(campoNome);
    return  !!campo && campo.valid && (campo?.touched || campo?.dirty)
  }

  mostrarSenha(){
    this.mostrarSenhaBool = !this.mostrarSenhaBool;
  }
}

import { Component, computed, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { AuthResponse, UsuarioLoginRequest } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  btnLogar = signal<boolean>(false);
  btnLogarDesativado = computed(() => !!this.btnLogar());
  senhaValida = signal(true);
  usuarioErro = 0;
  loginForm! : FormGroup; 
  mostrarSenhaBool: boolean = false;

  constructor(private usuarioService: UsuarioService = inject(UsuarioService), private router : Router){
    this.loginForm = new FormGroup({
      nome : new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      senha :  new FormControl<string>('', [Validators.required])
    })
  }

  logar(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.btnLogar.set(true);
      this.usuarioService.logar(this.loginForm.value as UsuarioLoginRequest).subscribe({
        next: (authResponse) => {
          this.usuarioService.definirUsuario(authResponse as AuthResponse);          
          this.btnLogar.set(false)
          this.router.createUrlTree(['clientes']);
        },
        error: (err) => {
          console.error(err);
          this.btnLogar.set(false);
        }
      })
    }
  }

  campoEstaValido(campoNome : string) : boolean{
    const campo = this.loginForm.get(campoNome);
    return  !!campo && campo.valid && (campo?.touched || campo?.dirty)
  }

  campoEstaBlank(controlName: string) : boolean{
    const control = this.loginForm.get(controlName);
    return !!control && control?.invalid && control.touched;
  }

  mostrarSenha(){
    this.mostrarSenhaBool = !this.mostrarSenhaBool;
  }
}

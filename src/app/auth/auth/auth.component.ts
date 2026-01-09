import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  senhaValida = true;
  usuarioErro = 0;
  loginForm! : FormGroup; 

  constructor(){
    this.loginForm = new FormGroup({
      nome : new FormControl('', [Validators.required, Validators.minLength(3)]),
      senha :  new FormControl('', [Validators.required])
    })
  }

  logar(){
    this.loginForm.markAllAsTouched();

  }

  campoEstaValido(campoNome : string) : boolean{
    const campo = this.loginForm.get(campoNome);
    return  !!campo && campo.valid && (campo?.touched || campo?.dirty)
  }
}

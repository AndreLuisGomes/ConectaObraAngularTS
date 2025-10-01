import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-suporte',
  standalone: false,
  templateUrl: './adicionar-suporte.component.html',
  styleUrl: './adicionar-suporte.component.scss'
})
export class AdicionarSuporteComponent {

  camposForm : FormGroup;

  constructor(){
    this.camposForm = new FormGroup({
      nome : new FormControl(null, Validators.required),
      tag: new FormControl(null, Validators.required),
      guia: new FormControl(null, Validators.required)
    })
  }

}

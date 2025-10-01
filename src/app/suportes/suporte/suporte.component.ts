import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suporte',
  standalone: false,
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.scss'
})

export class SuporteComponent {

  camposForm: FormGroup;

  constructor(){
    this.camposForm = new FormGroup({
      tag : new FormControl('', Validators.required)
    });
  }

  pesquisar(){
    console.log(this.camposForm.valid)
  }
}

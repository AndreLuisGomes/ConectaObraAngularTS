import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { SuporteComponent } from './suporte/suporte.component';
import { SuportesRoutingModule } from './suportes-routing.module';
import { AdicionarSuporteComponent } from './adicionar-suporte/adicionar-suporte.component';


@NgModule({
  declarations: [
    SuporteComponent,
    AdicionarSuporteComponent
  ],
  imports: [
    CommonModule,
    SuportesRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuportesModule { }

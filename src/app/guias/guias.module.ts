import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiasRoutingModule } from './guias-routing.module';
import { GuiaComponent } from './guia/guia.component';
import { AdicionarGuiaComponent } from './adicionar-guia/adicionar-guia.component';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GuiaComponent,
    AdicionarGuiaComponent
  ],
  imports: [
    CommonModule,
    GuiasRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class GuiasModule { }

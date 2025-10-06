import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';


@NgModule({
  declarations: [
    ClienteComponent,
    AdicionarClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask() 
  ]
})
export class ClientesModule {

 }

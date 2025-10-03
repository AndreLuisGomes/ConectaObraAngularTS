import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";


@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask() 
  ]
})
export class ClientesModule {

 }

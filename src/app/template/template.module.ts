import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SuportesModule } from '../suportes/suportes.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SuportesModule
  ]
})
export class TemplateModule { }

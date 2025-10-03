import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SuportesModule } from '../suportes/suportes.module';
import { LayoutService } from '../services/layout.service';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule
  ]
})
export class TemplateModule { 

  layoutService : LayoutService;

  constructor(layoutService : LayoutService){
    this.layoutService = layoutService;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaComponent } from './guia/guia.component';
import { AdicionarGuiaComponent } from './adicionar-guia/adicionar-guia.component';

const routes: Routes = [
  {
    path: '',
    component: GuiaComponent,
  },{
    path: 'adicionar',
    component: AdicionarGuiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiasRoutingModule { }

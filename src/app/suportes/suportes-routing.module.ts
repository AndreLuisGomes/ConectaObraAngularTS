import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuporteComponent } from './suporte/suporte.component';
import { AdicionarSuporteComponent } from './adicionar-suporte/adicionar-suporte.component';

const routes: Routes = [
  {
    path: '',
    component: SuporteComponent
  }
  ,{
    path: 'adicionar',
    component: AdicionarSuporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuportesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuporteComponent } from './suporte/suporte.component';

const routes: Routes = [
  {
    path: '',
    component: SuporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuportesRoutingModule { }

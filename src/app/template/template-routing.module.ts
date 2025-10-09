import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ClientesModule } from '../clientes/clientes.module';
import { GuiasModule } from '../guias/guias.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'suportes',
        loadChildren: () => import('../suportes/suportes.module').then(m => m.SuportesModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then(m => ClientesModule)
      },
      {
        path: 'guias',
        loadChildren: () => import('../guias/guias.module').then(m => GuiasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  }, {
    path: "auth/fazer-login",
    component: AuthComponent,
    // loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

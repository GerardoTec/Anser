import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InicioComponent} from './inicio/inicio.component';


const routes: Routes = [
  { path: 'inicio', component:InicioComponent},
  { path: 'admin', component: InicioComponent},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

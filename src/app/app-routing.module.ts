import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductos } from './crud-productos/crud-productos.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { PacienteComponent } from './paciente/paciente.component';
import { ReservaComponent } from './reserva/reserva.component';
=======
>>>>>>> 6dd5c2728a6ff6c874da20aad209cb7e4e06991d

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: HomeComponent
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'crud-productos',
    component: CrudProductos
  },
  {
<<<<<<< HEAD
    path: 'paciente',
    component: PacienteComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  },
  {
=======
>>>>>>> 6dd5c2728a6ff6c874da20aad209cb7e4e06991d
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

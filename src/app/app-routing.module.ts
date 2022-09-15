import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductos } from './crud-productos/crud-productos.component';
import { HomeComponent } from './home/home.component';

import { PacienteComponent } from './paciente/paciente.component';
import { ReservaComponent } from './reserva/reserva.component';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { AgregarFichaComponent } from './agregar-ficha/agregar-ficha.component';


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

    path: 'paciente',
    component: PacienteComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  },
  {
    path: 'ficha-clinica',
    component: FichaClinicaComponent
  },
  {
    path: 'ficha-clinica/agregar-ficha',
    component: AgregarFichaComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductos } from './crud-productos/crud-productos.component';
import { HomeComponent } from './home/home.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ReservaComponent } from './reserva/reserva.component';
import { RealizarReservaComponent } from './realizar-reserva/realizar-reserva.component';
import { HorarioAtencionComponent } from './horario-atencion/horario-atencion.component';
import { HorarioExcepcionComponent } from './horario-excepcion/horario-excepcion.component';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { ServiciosComponent} from './servicios/servicios.component';
import { AgregarServicioComponent } from './agregar-servicio/agregar-servicio.component';


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
    path: 'agregar-reserva',
    component: RealizarReservaComponent
  },
  {
    path: 'horario-atencion',
    component: HorarioAtencionComponent
  },
  {
    path: 'horario-excepcion',
    component: HorarioExcepcionComponent
  },
  {
    path: 'ficha-clinica',
    component: FichaClinicaComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'agregar-servicio',
    component: AgregarServicioComponent
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

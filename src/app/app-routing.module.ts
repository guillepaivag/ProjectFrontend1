import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductos } from './crud-productos/crud-productos.component';
import { HomeComponent } from './home/home.component';

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
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

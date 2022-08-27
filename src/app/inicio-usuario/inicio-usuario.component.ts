import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private servicioCategorias: ServicecategoriaService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => this.categorias = entity.lista,
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
  }

}

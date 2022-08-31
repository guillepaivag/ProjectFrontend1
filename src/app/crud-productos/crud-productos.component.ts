import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})
export class CrudProductos implements OnInit {

  categoriaGuardar: Categoria = new Categoria();
  TipoProductoGuardar: TipoProducto = new TipoProducto()

  mensaje: String = '';

  categorias: Categoria[] = [];
  tipoProductos: TipoProducto[] = [];

  constructor(private servicioCategorias: ServicecategoriaService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => this.categorias = entity.lista,
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    this.servicioCategorias.getTipoProductos().subscribe({
      next: (entity) => this.tipoProductos = entity.lista,
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
  }

  guardarCategoria(): void{
    this.servicioCategorias.guardarCategoria(this.categoriaGuardar).subscribe({
      next: (entity) => {
        this.mensaje = 'Agregado exitosamente'
        this.categorias.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
  };

  guardarTipoProductos(): void{
    this.servicioCategorias.guardarTipoProductos(this.TipoProductoGuardar).subscribe({
      next: (entity) => {
        this.mensaje = 'Agregado exitosamente'
        this.tipoProductos.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
  };
}

import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { PresentacionProducto } from '../model/presentacion-producto.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { PresentacionProductoService } from '../service/presentacion-producto.service';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})
export class CrudProductos implements OnInit {

  mensaje: String = '';

  categoriaGuardar: Categoria = new Categoria();
  TipoProductoGuardar: TipoProducto = new TipoProducto()
  presentacionProductoGuardar: PresentacionProducto = new PresentacionProducto()

  categorias: Categoria[] = [];
  tipoProductos: TipoProducto[] = [];
  presentacionProductos: PresentacionProducto[] = [];

  constructor(private servicioCategorias: ServicecategoriaService, private servicioProductos: PresentacionProductoService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => this.categorias = entity.lista,
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    this.servicioCategorias.getTipoProductos().subscribe({
      next: (entity) => this.tipoProductos = entity.lista,
      error: (error) => console.log('no se pudieron conseguir los productos', error),
    });
    this.servicioProductos.getPresentacionProducto().subscribe({
      next: (entity) => this.presentacionProductos = entity.lista,
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

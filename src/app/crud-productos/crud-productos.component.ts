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

  //listas auxiliares para paginación
  listaCategorias: Categoria[] = [];
  listaTipoProductos: TipoProducto[] = [];
  listaPresentacion: PresentacionProducto[] = [];

  //filtro
  TipoProductoBuscarDescripcion: string = '';
  TipoProductoBuscarId: string = '';

  //modificacion
  categoriaAEditar: Categoria = new Categoria();
  tipoProdcutoAEditar: TipoProducto = new TipoProducto();
  presentacionProductoAEditar: PresentacionProducto = new PresentacionProducto();

  //para paginacion, 1=categoria, 2=tipoProducto, 3=presentacion
  page1= 1;
  page2= 1;
  page3= 1;
  pageSize1 = 10;
  pageSize2 = 10;
  pageSize3 = 10;
  collectionSize1 = 0;
  collectionSize2 = 0;
  collectionSize3 = 0;

  constructor(private servicioCategorias: ServicecategoriaService, private servicioProductos: PresentacionProductoService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => {
        this.categorias = entity.lista
        this.collectionSize1 = this.categorias.length
        this.refreshCategorias()
      },
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    this.servicioCategorias.getTipoProductos().subscribe({
      next: (entity) => {
        this.tipoProductos = entity.lista
        this.collectionSize2 = this.tipoProductos.length
        this.refreshTipoProductos()
      },
      error: (error) => console.log('no se pudieron conseguir los productos', error),
    });
    this.servicioProductos.getPresentacionProducto().subscribe({
      next: (entity) => {
        this.presentacionProductos = entity.lista
        this.collectionSize3 = this.presentacionProductos.length
        this.refreshPresentacion()
      },
      error: (error) => console.log('no se pudieron conseguir las presentaciones', error),
    });
  }

  refreshCategorias() {
    this.listaCategorias = this.categorias
      .map((listaCategorias, i) => ({id: i + 1, ...listaCategorias}))
      .slice((this.page1- 1) * this.pageSize1, (this.page1- 1) * this.pageSize1 + this.pageSize1);
  }

  refreshTipoProductos() {
    this.listaTipoProductos = this.tipoProductos
      .map((listaCategorias, i) => ({id: i + 1, ...listaCategorias}))
      .slice((this.page2- 1) * this.pageSize2, (this.page2- 1) * this.pageSize2 + this.pageSize2);
  }

  refreshPresentacion() {
    this.listaPresentacion = this.presentacionProductos
      .map((listaCategorias, i) => ({id: i + 1, ...listaCategorias}))
      .slice((this.page3- 1) * this.pageSize3, (this.page3- 1) * this.pageSize3 + this.pageSize3);
  }

  setAModificarCategoria(c: Categoria){
    this.categoriaGuardar = { ...c };
    this.categoriaAEditar = c
  }

  setAModificarTipoProducto(t: TipoProducto){
    this.TipoProductoGuardar = { ...t };
    this.tipoProdcutoAEditar = t
  }

  setAModificarPresentacionProducto(p: PresentacionProducto){
    this.presentacionProductoGuardar = { ...p };
    this.presentacionProductoAEditar = p
  }

  getTipoProductosLikeDescripcion(): void{
    this.servicioCategorias.getTipoProductosLikeDescripcion(this.TipoProductoBuscarDescripcion).subscribe({
      next: (entity) => {
        this.tipoProductos = entity.lista
        this.collectionSize2 = this.tipoProductos.length
        this.refreshTipoProductos()
      },
      error: (error) => console.log('no se pudieron conseguir los productos con el filtro', error),
    });
    this.refreshTipoProductos()
  };

  getTipoProductosLikeId(): void{
    //si llega un campo vacío retorno la lista completa
    if(this.TipoProductoBuscarId == null) {
      this.servicioCategorias.getTipoProductos().subscribe({
        next: (entity) => {
          this.tipoProductos = entity.lista
          this.collectionSize2 = this.tipoProductos.length
          this.refreshTipoProductos()
        },
        error: (error) => console.log('no se pudieron conseguir los productos con el filtro', error),
      });
      this.refreshTipoProductos()
    }
    else {
      this.servicioCategorias.getTipoProductosLikeId(this.TipoProductoBuscarId).subscribe({
        next: (entity) => {
          this.tipoProductos = entity.lista
          this.collectionSize2 = this.tipoProductos.length
          this.refreshTipoProductos()
        },
        error: (error) => console.log('no se pudieron conseguir los productos con el filtro', error),
      });
    }
  };

  guardarCategoria(): void{
    this.servicioCategorias.guardarCategoria(this.categoriaGuardar).subscribe({
      next: (entity) => {
        this.mensaje = 'Agregado exitosamente'
        this.categorias.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
    const form:HTMLFormElement  = <HTMLFormElement> document.getElementById("formCategoria");
    form.reset()
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

  editarCategoria(): void{
    this.servicioCategorias.editarCategoria(this.categoriaAEditar).subscribe({
      next: (entity) => {
        this.mensaje = 'Editado exitosamente'
        this.categorias.splice(this.categorias.indexOf(this.categoriaAEditar))
        this.categorias.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
  };

  editarTipoProductos(): void{
    this.servicioCategorias.editarTipoProducto(this.tipoProdcutoAEditar).subscribe({
      next: (entity) => {
        this.mensaje = 'Editado exitosamente'
        this.tipoProductos.splice(this.tipoProductos.indexOf(this.tipoProdcutoAEditar))
        this.tipoProductos.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
  };

  editarPresentacionProducto(): void{

  };

  eliminarCategoria(c: Categoria): void{
    this.servicioCategorias.eliminarCategoria(c).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente'
        this.categorias.splice(this.categorias.indexOf(entity))
      },
      error: (error) => console.log("error: " + error),
    })
  }

  eliminarTipoProductos(t: TipoProducto): void{
    this.servicioCategorias.eliminarTipoProductos(t).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente'
        this.tipoProductos.splice(this.tipoProductos.indexOf(entity))
      },
      error: (error) => console.log("error: " + error),
    })
  }

  eliminarPresentacionProducto(p: PresentacionProducto): void{
    this.servicioProductos.eliminarPresentacionProducto(p).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente'
        this.presentacionProductos.splice(this.presentacionProductos.indexOf(entity))
      },
      error: (error) => console.log("error: " + error),
    })
  }
}

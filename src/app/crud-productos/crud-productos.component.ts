import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { PresentacionProducto } from '../model/presentacion-producto.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { PresentacionProductoService } from '../service/presentacion-producto.service';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css'],
})
export class CrudProductos implements OnInit {
  mensaje: String = '';

  categoriaGuardar: Categoria = new Categoria();
  TipoProductoGuardar: TipoProducto = new TipoProducto();
  presentacionProductoGuardar: PresentacionProducto =
    new PresentacionProducto();

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
  presentacionProductoAEditar: PresentacionProducto =
    new PresentacionProducto();

  categoriaAEditarAux: Categoria = new Categoria();
  tipoProdcutoAEditarAux: TipoProducto = new TipoProducto();
  presentacionProductoAEditarAux: PresentacionProducto =
    new PresentacionProducto();

  //para paginacion, 1=categoria, 2=tipoProducto, 3=presentacion
  pageCategoria = 1;
  pageTipoProducto = 1;
  pagePresentacionProducto = 1;

  pageSizeCategoria = 10;
  pageSizeTipoProducto = 10;
  pageSizePresentacion = 10;

  collectionSizeCategoria = 0;
  collectionSizeTipoProducto = 0;
  collectionSizePresentacion = 0;

  constructor(
    private servicioCategorias: ServicecategoriaService,
    private servicioProductos: PresentacionProductoService
  ) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => {
        this.categorias = entity.lista;
        this.collectionSizeCategoria = this.categorias.length;
        this.refreshCategorias();
      },
      error: (error) =>
        console.log('no se pudieron conseguir las categorias', error),
    });
    this.servicioCategorias.getTipoProductos().subscribe({
      next: (entity) => {
        this.tipoProductos = entity.lista;
        this.collectionSizeTipoProducto = this.tipoProductos.length;
        this.refreshTipoProductos();
      },
      error: (error) =>
        console.log('no se pudieron conseguir los productos', error),
    });
    this.servicioProductos.getPresentacionProducto().subscribe({
      next: (entity) => {
        this.presentacionProductos = entity.lista;
        this.collectionSizePresentacion = this.presentacionProductos.length;
        this.refreshPresentacion();
      },
      error: (error) =>
        console.log('no se pudieron conseguir las presentaciones', error),
    });
  }

  refreshCategorias() {
    this.listaCategorias = this.categorias
      .map((listaCategorias, i) => ({ id: i + 1, ...listaCategorias }))
      .slice(
        (this.pageCategoria - 1) * this.pageSizeCategoria,
        (this.pageCategoria - 1) * this.pageSizeCategoria +
        this.pageSizeCategoria
      );
  }

  refreshTipoProductos() {
    this.listaTipoProductos = this.tipoProductos
      .map((listaCategorias, i) => ({ id: i + 1, ...listaCategorias }))
      .slice(
        (this.pageTipoProducto - 1) * this.pageSizeTipoProducto,
        (this.pageTipoProducto - 1) * this.pageSizeTipoProducto +
        this.pageSizeTipoProducto
      );
  }

  refreshPresentacion() {
    this.listaPresentacion = this.presentacionProductos
      .map((listaCategorias, i) => ({ id: i + 1, ...listaCategorias }))
      .slice(
        (this.pagePresentacionProducto - 1) * this.pageSizePresentacion,
        (this.pagePresentacionProducto - 1) * this.pageSizePresentacion +
        this.pageSizePresentacion
      );
  }

  getTipoProductosLikeDescripcion(): void {
    this.servicioCategorias
      .getTipoProductosLikeDescripcion(this.TipoProductoBuscarDescripcion)
      .subscribe({
        next: (entity) => {
          this.tipoProductos = entity.lista;
          this.collectionSizeTipoProducto = this.tipoProductos.length;
          this.refreshTipoProductos();
        },
        error: (error) =>
          console.log(
            'no se pudieron conseguir los productos con el filtro',
            error
          ),
      });
    this.refreshTipoProductos();
  }

  getTipoProductosLikeId(): void {
    //si llega un campo vacío retorno la lista completa
    if (this.TipoProductoBuscarId == '') {
      this.servicioCategorias.getTipoProductos().subscribe({
        next: (entity) => {
          this.tipoProductos = entity.lista;
          this.collectionSizeTipoProducto = this.tipoProductos.length;
          this.refreshTipoProductos();
        },
        error: (error) =>
          console.log('no se pudieron conseguir los productos', error),
      });
    } else {
      this.servicioCategorias
        .getTipoProductosLikeId(this.TipoProductoBuscarId)
        .subscribe({
          next: (entity) => {
            this.tipoProductos = entity.lista;
            this.collectionSizeTipoProducto = this.tipoProductos.length;
            this.refreshTipoProductos();
          },
          error: (error) =>
            console.log(
              'no se pudieron conseguir los productos con el filtro',
              error
            ),
        });
    }
  }

  guardarCategoria(): void {
    this.servicioCategorias.guardarCategoria(this.categoriaGuardar).subscribe({
      next: (entity) => {
        this.mensaje = 'Agregado exitosamente';
        this.categorias.push(entity);
      },
      error: (error) => console.log('error: ' + error),
    });
    const form: HTMLFormElement = <HTMLFormElement>(
      document.getElementById('formCategoria')
    );
    form.reset();
  }

  guardarTipoProductos(): void {
    this.servicioCategorias
      .guardarTipoProductos(this.TipoProductoGuardar)
      .subscribe({
        next: (entity) => {
          this.mensaje = 'Agregado exitosamente';
          this.tipoProductos.push(entity);
        },
        error: (error) => console.log('error: ' + error),
      });
  }

  setAModificarCategoria(c: Categoria) {
    this.categoriaAEditar = c;
    this.categoriaAEditarAux.idCategoria = c.idCategoria;
    this.categoriaAEditarAux.descripcion = c.descripcion;
  }

  setAModificarTipoProducto(t: TipoProducto) {
    this.tipoProdcutoAEditar = t;
    this.tipoProdcutoAEditarAux.idCategoria = t.idCategoria;
    this.tipoProdcutoAEditarAux.descripcion = t.descripcion;
  }

  setAModificarPresentacionProducto(p: PresentacionProducto) {
    this.presentacionProductoAEditar = p;
    this.presentacionProductoAEditarAux.idPresentacionProducto =
      p.idPresentacionProducto;
    this.presentacionProductoAEditarAux.descripcion = p.descripcion;
  }

  editarCategoria(): void {
    this.servicioCategorias
      .editarCategoria(this.categoriaAEditarAux)
      .subscribe({
        next: (entity) => {
          this.mensaje = 'Editado exitosamente';
          this.categorias.splice(
            this.categorias.indexOf(this.categoriaAEditar)
          );
          this.categorias.push(entity);
        },
        error: (error) => console.log('error: ' + error),
      });
  }

  editarTipoProductos(): void {
    this.servicioCategorias
      .editarTipoProducto(this.tipoProdcutoAEditarAux)
      .subscribe({
        next: (entity) => {
          this.mensaje = 'Editado exitosamente';
          this.tipoProductos.splice(
            this.tipoProductos.indexOf(this.tipoProdcutoAEditar)
          );
          this.tipoProductos.push(entity);
        },
        error: (error) => console.log('error: ' + error),
      });
  }

  editarPresentacionProducto(): void { }

  eliminarCategoria(c: Categoria): void {
    this.servicioCategorias.eliminarCategoria(c).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente';
        this.categorias.splice(this.categorias.indexOf(c));
      },
      error: (error) => console.log('error: ' + error),
    });
  }

  eliminarTipoProductos(t: TipoProducto): void {
    this.servicioCategorias.eliminarTipoProductos(t).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente';
        this.tipoProductos.splice(this.tipoProductos.indexOf(t));
      },
      error: (error) => console.log('error: ' + error),
    });
  }

  eliminarPresentacionProducto(p: PresentacionProducto): void {
    this.servicioProductos.eliminarPresentacionProducto(p).subscribe({
      next: (entity) => {
        this.mensaje = 'Eliminar exitosamente';
        this.presentacionProductos.splice(
          this.presentacionProductos.indexOf(p)
        );
      },
      error: (error) => console.log('error: ' + error),
    });
  }
}

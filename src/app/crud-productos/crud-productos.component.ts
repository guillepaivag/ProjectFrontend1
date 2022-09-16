import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { PresentacionProducto } from '../model/presentacion-producto.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css'],
})
export class CrudProductos implements OnInit {
  mensajeCategoria: String = '';
  mensajeTipoProducto: String = '';
  mensajePresentacion: String = '';

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
  ) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => {
        this.categorias = entity.lista;
        this.collectionSizeCategoria = this.categorias.length;
        this.refreshCategorias();
      },
      error: (error) =>
        console.log('no se pudieron conseguir las categorias'+ JSON.stringify(error)),
    });
    this.servicioCategorias.getTipoProductos().subscribe({
      next: (entity) => {
        this.tipoProductos = entity.lista;
        this.collectionSizeTipoProducto = this.tipoProductos.length;
        this.refreshTipoProductos();
      },
      error: (error) =>
        console.log('no se pudieron conseguir los productos'+ JSON.stringify(error)),
    });
    this.servicioCategorias.getPresentacionProducto().subscribe({
      next: (entity) => {
        this.presentacionProductos = entity.lista;
        this.collectionSizePresentacion = this.presentacionProductos.length;
        this.refreshPresentacion();
      },
      error: (error) =>
        console.log('no se pudieron conseguir las presentaciones'+ JSON.stringify(error)),
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
      .map((listaTipoProductos, i) => ({ id: i + 1, ...listaTipoProductos }))
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
          console.log('no se pudieron conseguir los productos'+ JSON.stringify(error)),
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
        this.mensajeCategoria = 'Agregado exitosamente';
        this.categorias.push(entity);
        this.refreshCategorias();
      },
      error: (error) => console.log('error: '+ JSON.stringify(error)),
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
          this.mensajeTipoProducto = 'Agregado exitosamente';
          this.tipoProductos.push(entity);
          this.collectionSizeTipoProducto = this.tipoProductos.length;
          //ejecutamos un filtro vacio para que nos traiga toda la lista, para evitar un bug
          // this.TipoProductoBuscarDescripcion = "";
          // this.getTipoProductosLikeDescripcion()
          this.refreshTipoProductos();
        },
        error: (error) => console.log('error: '+ JSON.stringify(error)),
      });
  }

  guardarPresentacionProducto(): void {
    this.presentacionProductoGuardar.codigo = this.presentacionProductos[this.presentacionProductos.length - 1].codigo + 1
    console.log(this.presentacionProductoGuardar)
    this.servicioCategorias
      .guardarPresentacionProducto(this.presentacionProductoGuardar)
      .subscribe({
        next: (entity) => {
          this.mensajePresentacion = 'Agregado exitosamente';
          this.presentacionProductos.push(entity);
          this.collectionSizeTipoProducto = this.presentacionProductos.length;
          this.refreshPresentacion();
        },
        error: (error) => console.log('error: '+ JSON.stringify(error)),
      });
  }

  setAModificarCategoria(c: Categoria) {
    this.categoriaAEditar = c;
    this.categoriaAEditarAux.idCategoria = c.idCategoria;
    this.categoriaAEditarAux.descripcion = c.descripcion;
  }

  setAModificarTipoProducto(t: TipoProducto) {
    this.tipoProdcutoAEditar = t;
    this.tipoProdcutoAEditarAux.idTipoProducto = t.idTipoProducto;
    this.tipoProdcutoAEditarAux.idCategoria.idCategoria = t.idCategoria.idCategoria;
    this.tipoProdcutoAEditarAux.descripcion = t.descripcion;
  }

  setAModificarPresentacionProducto(p: PresentacionProducto) {
    this.presentacionProductoAEditar = p;
    this.presentacionProductoAEditarAux.idPresentacionProducto = p.idPresentacionProducto;
    this.presentacionProductoAEditarAux.idProducto = p.idProducto
    this.presentacionProductoAEditarAux.codigo = p.codigo;
    this.presentacionProductoAEditarAux.descripcion = p.descripcion;
  }

  editarCategoria(): void {
    this.servicioCategorias
      .editarCategoria(this.categoriaAEditarAux)
      .subscribe({
        next: () => this.categoriaAEditar.descripcion = this.categoriaAEditarAux.descripcion,
        error: (error) => console.log('error: '+ JSON.stringify(error)),
      });
  }

  editarTipoProductos(): void {
    this.servicioCategorias
      .editarTipoProducto(this.tipoProdcutoAEditarAux)
      .subscribe({
        next: () => {
          this.tipoProdcutoAEditar.idCategoria.idCategoria = this.tipoProdcutoAEditarAux.idCategoria.idCategoria
          this.tipoProdcutoAEditar.descripcion = this.tipoProdcutoAEditarAux.descripcion
        },
        error: (error) => console.log('error: '+ JSON.stringify(error)),
      });
  }

  editarPresentacionProducto(): void {
    this.servicioCategorias
      .editarPresentacion(this.presentacionProductoAEditarAux)
      .subscribe({
        next: () => this.presentacionProductoAEditar.nombre = this.presentacionProductoAEditarAux.nombre,
        error: (error) => console.log('error: '+ JSON.stringify(error)),
      });
  }

  eliminarCategoria(c: Categoria): void {
    this.servicioCategorias.eliminarCategoria(c).subscribe({
      next: (entity) => {
        this.mensajeCategoria = 'Eliminar exitosamente';
        let out = this.categorias.find(element => element.idCategoria == c.idCategoria);
        let index = this.categorias.indexOf(out!);
        this.categorias.splice(index, 1);
        this.refreshCategorias();
      },
      error: (error) => console.log('error: '+ JSON.stringify(error)),
    });
  }

  eliminarTipoProductos(t: TipoProducto): void {
    this.servicioCategorias.eliminarTipoProductos(t).subscribe({
      next: (entity) => {
        this.mensajeTipoProducto = 'Eliminar exitosamente';
        let out = this.tipoProductos.find(element => element.idTipoProducto == t.idTipoProducto);
        let index = this.tipoProductos.indexOf(out!);
        this.tipoProductos.splice(index, 1);
        this.refreshTipoProductos();
      },
      error: (error) => console.log('error: '+ JSON.stringify(error)),
    });
  }

  eliminarPresentacionProducto(p: PresentacionProducto): void {
    this.servicioCategorias.eliminarPresentacionProducto(p).subscribe({
      next: (entity) => {
        this.mensajePresentacion = 'Eliminar exitosamente';
        let out = this.presentacionProductos.find(element => element.idPresentacionProducto == p.idPresentacionProducto);
        let index = this.presentacionProductos.indexOf(out!);
        this.presentacionProductos.splice(index, 1);
        this.refreshPresentacion();
      },
      error: (error) => console.log('error: '+ JSON.stringify(error)),
    });
  }
}

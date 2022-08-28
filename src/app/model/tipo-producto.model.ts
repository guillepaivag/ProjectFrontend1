import { Categoria } from './categoria.model'

export class TipoProducto {
  idTipoProducto!: number;
  descripcion!: string;
  idCategoria: Categoria = new Categoria;
}

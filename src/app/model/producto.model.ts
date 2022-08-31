import { TipoProducto } from './tipo-producto.model'

export class Producto {
  idProducto!: number;
  descripcion!: string;
  idTipoProducto = new TipoProducto()
}

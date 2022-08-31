import { Producto } from './producto.model'

export class PresentacionProducto {
  idPresentacionProducto!: number;
  codigo!: number;
  nombre!: string;
  tamanho!: number;
  descripcion!: string;
  flagServicio!: string;
  idProducto = new Producto()
  existenciaProducto!: any
}

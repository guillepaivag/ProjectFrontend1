import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { listadatos } from '../model/datos.model';
import { Categoria } from '../model/categoria.model';
import { TipoProducto } from '../model/tipo-producto.model';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoriaService {

  private api: string = "/stock-nutrinatalia";

  constructor(
    private http: HttpClient
  ) { }

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(`${this.api}/categoria`);
  }

  guardarCategoria(c: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.api}/categoria`, c).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }


  getTipoProductos(): Observable<listadatos<TipoProducto>> {
    return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto`);
  }

  getTipoProductosLike(buscar: string): Observable<listadatos<TipoProducto>> {
    return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto?like=S&ejemplo=%7B%22descripcion%22%3A%22${buscar}%22%7D`);
    //return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto?like=S&ejemplo={"descripcion":"${buscar}"}`);
  }

  guardarTipoProductos(t: TipoProducto): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(`${this.api}/tipoProducto`, t).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

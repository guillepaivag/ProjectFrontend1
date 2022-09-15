import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { listadatos } from '../model/datos.model';
import { Categoria } from '../model/categoria.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { PresentacionProducto } from '../model/presentacion-producto.model';

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
        next: (data) => console.log('agregado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  getTipoProductos(): Observable<listadatos<TipoProducto>> {
    return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto`);
  }

  guardarTipoProductos(t: TipoProducto): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(`${this.api}/tipoProducto`, t).pipe(
      tap({
        next: (data) => console.log('agregado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  getTipoProductosLikeDescripcion(buscar: string): Observable<listadatos<TipoProducto>> {
    return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto?like=S&ejemplo=%7B%22descripcion%22%3A%22${buscar}%22%7D`).pipe(
      tap({
        next: (data) => console.log('data ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }
  getTipoProductosLikeId(buscar: string): Observable<listadatos<TipoProducto>> {
    return this.http.get<listadatos<TipoProducto>>(`${this.api}/tipoProducto?ejemplo=%7B"idCategoria"%3A%7B"idCategoria"%3A%20${buscar}%7D%7D`).pipe(
      tap({
        next: (data) => console.log('data ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  eliminarCategoria(c: Categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.api}/categoria/${c.idCategoria}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  eliminarTipoProductos(t: TipoProducto): Observable<TipoProducto> {
    return this.http.delete<TipoProducto>(`${this.api}/tipoProducto/${t.idTipoProducto}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  editarCategoria(c: Categoria): Observable<Categoria> {
    let aux: Categoria = new Categoria()
    aux.idCategoria = c.idCategoria
    aux.descripcion = c.descripcion
    return this.http.put<Categoria>(`${this.api}/categoria`, aux).pipe(
      tap({
        next: (data) => console.log('modificado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  editarTipoProducto(t: TipoProducto): Observable<TipoProducto> {
    return this.http.put<TipoProducto>(`${this.api}/tipoProducto`, t).pipe(
      tap({
        next: (data) => console.log('modificado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  editarPresentacion(p: PresentacionProducto): Observable<PresentacionProducto> {
    return this.http.put<PresentacionProducto>(`${this.api}/presentacionProducto`, p).pipe(
      tap({
        next: (data) => console.log('modificado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  getPresentacionProducto(): Observable<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(`${this.api}/presentacionProducto`);
  }

  guardarPresentacionProducto(c: PresentacionProducto): Observable<PresentacionProducto> {
    return this.http.post<PresentacionProducto>(`${this.api}/presentacionProducto`, c).pipe(
      tap({
        next: (data) => console.log('agregado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  eliminarPresentacionProducto(t: PresentacionProducto): Observable<PresentacionProducto> {
    return this.http.delete<PresentacionProducto>(`${this.api}/presentacionProducto/${t.idPresentacionProducto}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post<Categoria>(`${this.api}/categoria`, c, options).pipe(
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post<TipoProducto>(`${this.api}/tipoProducto`, t, options).pipe(
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.delete<Categoria>(`${this.api}/categoria/${c.idCategoria}`, options).pipe(
      tap({
        next: (data) => console.log('eliminado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  eliminarTipoProductos(t: TipoProducto): Observable<TipoProducto> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.delete<TipoProducto>(`${this.api}/tipoProducto/${t.idTipoProducto}`, options).pipe(
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

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.put<Categoria>(`${this.api}/categoria`, aux, options).pipe(
      tap({
        next: (data) => console.log('modificado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  editarTipoProducto(t: TipoProducto): Observable<TipoProducto> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.put<TipoProducto>(`${this.api}/tipoProducto`, t, options).pipe(
      tap({
        next: (data) => console.log('modificado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  editarPresentacion(p: PresentacionProducto): Observable<PresentacionProducto> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.put<PresentacionProducto>(`${this.api}/presentacionProducto`, p, options).pipe(
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post<PresentacionProducto>(`${this.api}/presentacionProducto`, c, options).pipe(
      tap({
        next: (data) => console.log('agregado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

  eliminarPresentacionProducto(t: PresentacionProducto): Observable<PresentacionProducto> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.delete<PresentacionProducto>(`${this.api}/presentacionProducto/${t.idPresentacionProducto}`, options).pipe(
      tap({
        next: (data) => console.log('eliminado ' + JSON.stringify(data)),
        error: (error) => console.log("error: " + JSON.stringify(error)),
      })
    );
  }

}

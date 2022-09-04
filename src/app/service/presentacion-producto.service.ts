import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { listadatos } from '../model/datos.model';
import { PresentacionProducto } from '../model/presentacion-producto.model';

@Injectable({
  providedIn: 'root'
})
export class PresentacionProductoService {

  private api: string = "/stock-nutrinatalia";

  constructor(
    private http: HttpClient
  ) { }

  getPresentacionProducto(): Observable<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(`${this.api}/presentacionProducto`);
  }

  guardarPresentacionProducto(c: PresentacionProducto): Observable<PresentacionProducto> {
    return this.http.post<PresentacionProducto>(`${this.api}/presentacionProducto`, c).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  eliminarPresentacionProducto(t: PresentacionProducto): Observable<PresentacionProducto> {
    return this.http.delete<PresentacionProducto>(`${this.api}/presentacionProducto/${t.idPresentacionProducto}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { listadatos } from '../model/datos.model';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoriaService {

  private api: string = "/stock-nutrinatalia/categoria";

  constructor(
    private http: HttpClient
  ) { }

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.api);
  }

  guardarCategoria(c: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.api, c).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

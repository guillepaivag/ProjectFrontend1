import { Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HorarioExcepcion } from '../model/horario-excepcion.model';
import { listadatos } from '../model/datos.model';


@Injectable({
  providedIn: 'root'
})
export class HorarioExcepcionService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  obtener(): Observable<listadatos<HorarioExcepcion>> {
    return this.http.get<listadatos<HorarioExcepcion>>(`${this.api}/horarioExcepcion`);
  }

  agregar(p: any): Observable<any> {
    return this.http.post(`${this.api}/horarioExcepcion`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  borrar(id: String): Observable<any> {
    return this.http.delete(`${this.api}/horarioExcepcion/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  actualizar(p: any): Observable<any> {
    return this.http.put(`${this.api}/horarioExcepcion`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }
}

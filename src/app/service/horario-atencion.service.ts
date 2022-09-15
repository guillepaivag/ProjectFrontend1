import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HorarioAtencion } from '../model/horario-atencion.model';
import { listadatos } from '../model/datos.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  obtener(): Observable<listadatos<HorarioAtencion>> {
    return this.http.get<listadatos<HorarioAtencion>>(`${this.api}/personaHorarioAgenda`);
  }

  agregar(p: any): Observable<any> {
    return this.http.post(`${this.api}/personaHorarioAgenda`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  borrar(id: String): Observable<any> {
    return this.http.delete(`${this.api}/personaHorarioAgenda/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  actualizar(p: any): Observable<any> {
    return this.http.put(`${this.api}/personaHorarioAgenda`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

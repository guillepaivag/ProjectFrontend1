import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post(`${this.api}/personaHorarioAgenda`, p, options).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => {console.log("error: " + error); alert(`Ha ocurrido un error ${error.error}`)},
      })
    );
  }

  borrar(id: String): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.delete(`${this.api}/personaHorarioAgenda/${id}`, options).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => {console.log("error: " + error); alert(`Ha ocurrido un error ${error.error}`)},
      })
    );
  }

  actualizar(p: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.put(`${this.api}/personaHorarioAgenda`, p, options).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => {console.log("error: " + error); alert(`Ha ocurrido un error ${error.error}`)},
      })
    );
  }
}

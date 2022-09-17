import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HorarioExcepcion } from '../model/horario-excepcion.model';
import { listadatos } from '../model/datos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post(`${this.api}/horarioExcepcion`, p, options).pipe(
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
    return this.http.delete(`${this.api}/horarioExcepcion/${id}`, options).pipe(
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
    return this.http.put(`${this.api}/horarioExcepcion`, p, options).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => {console.log("error: " + error); alert(`Ha ocurrido un error ${error.error}`)},
      })
    );
  }
}

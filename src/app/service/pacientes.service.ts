import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Paciente } from '../model/paciente.model';
import { listadatos } from '../model/datos.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(`${this.api}/persona`);
  }

  getPacientePorNombre(nombre: String): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(`${this.api}/persona?ejemplo=%7B%22nombre%22%3A%22${nombre}%22%7D`);
  }

  getEmpleadoPorNombre(nombre: String): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(`${this.api}/persona?ejemplo=%7B%22nombre%22%3A%22${nombre}%22%7D`);
  }

  agregar(p: any): Observable<any> {
    return this.http.post(`${this.api}/persona`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  borrar(id: String): Observable<any> {
    return this.http.delete(`${this.api}/persona/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  actualizar(p: any): Observable<any> {
    return this.http.put(`${this.api}/persona`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }
}

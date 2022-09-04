import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Paciente } from '../model/paciente.model';
import { listadatos } from '../model/datos.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<listadatos<Paciente>> {
    return this.http.get<listadatos<Paciente>>(`${this.api}/persona`);
  }

  guardarPaciente(p: Paciente): Observable<any> {
    return this.http.post(`${this.api}/persona`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  borrarPaciente(email: any): Observable<any> {
    return this.http.delete(`${this.api}/persona/${email}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  actualizarPaciente(p: any): Observable<any> {
    return this.http.put(`${this.api}/persona`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

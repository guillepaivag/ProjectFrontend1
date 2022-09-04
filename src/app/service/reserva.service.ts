import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Reserva } from '../model/reserva.model';
import { listadatos } from '../model/datos.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient){}

  getReservas(): Observable<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(`${this.api}/reserva`);
  }

  guardarReserva(p: Reserva): Observable<any> {
    return this.http.post(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  borrarReserva(id: Number): Observable<any> {
    return this.http.delete(`${this.api}/reserva/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  actualizarReserva(p: any): Observable<any> {
    return this.http.put(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

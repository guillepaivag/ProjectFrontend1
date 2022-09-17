import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  agregarReserva(p: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.post(`${this.api}/reserva`, p,options).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  borrarReserva(id: Number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.delete(`${this.api}/reserva/${id}`, options).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  actualizarReserva(p: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };
    return this.http.put(`${this.api}/reserva`, p, options).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => {console.log("error: " + error); alert("Ha ocurrido un error")},
      })
    );
  }

  obtenerTodasHorasReservas(filtros:String[],idEmpelado:number,fecha:string,flagDisponible:string): Observable<Reserva[]> {
    
    if(filtros.includes('Disponible')){
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}&disponible=${flagDisponible}`)
    } else{
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}`)
    }  
  }



}

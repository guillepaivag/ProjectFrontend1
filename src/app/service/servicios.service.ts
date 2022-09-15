import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos.model';
import { Servicio } from '../model/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient){}

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(`${this.api}/servicio`);
  }

  agregarServicio(p: any): Observable<any> {
    return this.http.post(`${this.api}/servicio`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  borrarServicio(id: Number): Observable<any> {
    return this.http.delete(`${this.api}/servicio/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  actualizarServicio(p: any): Observable<any> {
    return this.http.put(`${this.api}/servicio`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  obtenerTodasHorasServicios(filtros:String[],idEmpelado:number,fecha:string,flagDisponible:string): Observable<Servicio[]> {

    if(filtros.includes('Disponible')){
      return this.http.get<Servicio[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}&disponible=${flagDisponible}`)
    } else{
      return this.http.get<Servicio[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}`)
    }
  }


}

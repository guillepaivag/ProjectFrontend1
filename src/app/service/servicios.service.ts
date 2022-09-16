import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { listadatos } from '../model/datos.model';
import { Servicio } from '../model/servicio.model';
import { FichaClinica } from '../model/ficha-clinica.model';
import { Detalle } from '../model/detalle.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient){}

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(`${this.api}/servicio`);
  }

  getServiciosFiltrado(empleado:string, cliente: string): Observable<listadatos<Servicio>> {
    if(empleado && cliente)
      return this.http.get<listadatos<Servicio>>(`${this.api}/servicio?ejemplo=%7B%22idEmpleado%22%3A%7B%22idPersona%22%3A${empleado}%7D%2C%22idFichaClinica%22%3A%7B%22idCliente%22%3A%7B%22idPersona%22%3A${cliente}%7D%7D%7D`);
    else if (empleado)
      return this.http.get<listadatos<Servicio>>(`${this.api}/servicio?ejemplo=%7B%22idEmpleado%22%3A%7B%22idPersona%22%3A${empleado}%7D%7D`);
    else
    return this.http.get<listadatos<Servicio>>(`${this.api}/servicio?ejemplo=%7B%22idFichaClinica%22%3A%7B%22idCliente%22%3A%7B%22idPersona%22%3A${cliente}%7D%7D%7D%0A`);
  }

  getFichaClinica(): Observable<listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(`${this.api}/fichaClinica`);
  }

  getServicio(idServicio: any): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.api}/servicio/${idServicio}`);
  }

  getFichaClinicaServicio(idFicha: any): Observable<FichaClinica> {
    return this.http.get<FichaClinica>(`${this.api}/fichaClinica/${idFicha}`);
  }

  getFichaClinicaFiltrado(empleado:string, cliente:string, fecha:string): Observable<listadatos<FichaClinica>>{
    if(empleado && cliente)
      return this.http.get<listadatos<FichaClinica>>(`${this.api}/fichaClinica?ejemplo=%7B%22fechaDesdeCadena%22%3A%22${fecha}%22%2C%22fechaHastaCadena%22%3A%22${fecha}%22%2C%22idCliente%22%3A%7B%22idPersona%22%3A${cliente}%7D%2C%22idEmpleado%22%3A%7B%22idPersona%22%3A${empleado}%7D%7D%0A`);
    else if (empleado)
      return this.http.get<listadatos<FichaClinica>>(`${this.api}/fichaClinica?ejemplo=%7B%22fechaDesdeCadena%22%3A%22${fecha}%22%2C%22fechaHastaCadena%22%3A%22${fecha}%22%2C%22idEmpleado%22%3A%7B%22idPersona%22%3A${empleado}%7D%7D%0A`);
    else
      return this.http.get<listadatos<FichaClinica>>(`${this.api}/fichaClinica?ejemplo=%7B%22fechaDesdeCadena%22%3A%22${fecha}%22%2C%22fechaHastaCadena%22%3A%22${fecha}%22%2C%22idCliente%22%3A%7B%22idPersona%22%3A${cliente}%7D%0A%7D%0A`);
  }


  agregarServicio(p: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };

    return this.http.post(`${this.api}/servicio`, p, options).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  agregarDetalle(idServicio: any, p: any): Observable<any> {
    return this.http.post(`${this.api}/servicio/${idServicio}/detalle`, p).pipe(
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

  getDetalles(id:any): Observable<listadatos<Detalle>> {
    return this.http.get<listadatos<Detalle>>(`${this.api}/servicio/${id}/detalle`);
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

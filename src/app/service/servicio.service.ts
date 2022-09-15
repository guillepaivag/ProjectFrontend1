import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../model/servicio.model';
import { listadatos } from '../model/datos.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(`${this.api}/servicio`);
  }
}

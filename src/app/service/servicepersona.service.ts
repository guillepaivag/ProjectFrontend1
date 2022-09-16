import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { listadatos } from '../model/datos.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ServicePersonaService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(`${this.api}/persona`);
  }
}

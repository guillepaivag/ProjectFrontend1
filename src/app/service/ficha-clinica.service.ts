import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FichaClinica } from '../model/ficha-clinica.model';
import { listadatos } from '../model/datos.model';

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getFichaClinica(): Observable<listadatos<FichaClinica>> {
    return this.http.get<listadatos<FichaClinica>>(`${this.api}/fichaClinica`);
  }
}

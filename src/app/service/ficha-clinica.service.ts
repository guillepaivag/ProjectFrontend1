import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  guardar(p: any): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });

    let options = { headers: headers };

    return this.http.post(`${this.api}/fichaClinica`, p, options).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

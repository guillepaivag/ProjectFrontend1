import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any> {
    return this.http.get(`${this.api}/persona`);
  }

  guardarCategoria(p: any): Observable<any> {
    return this.http.post(`${this.api}/persona`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }
}

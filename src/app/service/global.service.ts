import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Compartido {
  public estaLogeado = false;
  public usuario: String= "";
  public idUsuario: number=0;
}
import { Component, OnInit } from '@angular/core';
import { Compartido } from '../service/global.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: String
  constructor( private compartido: Compartido) { 
    this.usuario = this.compartido.usuario
  }

  ngOnInit(): void {
  }

}

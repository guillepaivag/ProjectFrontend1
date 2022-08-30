import { Component, OnInit } from '@angular/core';
import { Compartido } from '../service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estaLogeado: boolean
  constructor(private compartido: Compartido) {
    this.estaLogeado = this.compartido.estaLogeado
    console.log(this.estaLogeado)
  }

  ngOnInit(): void {

  }


}

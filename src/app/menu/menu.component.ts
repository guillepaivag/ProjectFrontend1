import { Component, OnInit } from '@angular/core';
import { Compartido } from '../service/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: String
  constructor( private compartido: Compartido) {
    this.usuario = this.compartido.usuario
  }

  ngOnInit(): void {
  }

}

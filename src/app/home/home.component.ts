import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estaLogeado: boolean
  constructor() {
    this.estaLogeado = true
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Compartido } from '../service/global.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    private compartido: Compartido
  ) { 

  }

  ngOnInit(): void {
  }

}

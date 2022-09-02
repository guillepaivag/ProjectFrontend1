import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: String
  constructor(private router: Router) {
    this.usuario = ''
  }

  ngOnInit(): void {
  }

  salir(){
    localStorage.setItem('usuarioNombre', '')
    localStorage.setItem('logueado', 'false')
    this.router.navigateByUrl('login');
  }
}

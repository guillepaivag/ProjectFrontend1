import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: string | null = ''

  constructor(private router:Router) {
    this.nombreUsuario = localStorage.getItem('usuarioNombre')
  }

  ngOnInit(): void {
  }

  salir(){
    localStorage.setItem('usuarioNombre', '')
    localStorage.setItem('logueado', 'false')
    this.router.navigateByUrl('login');
  }

}

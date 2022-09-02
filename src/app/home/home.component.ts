import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estaLogeado : boolean
  constructor(private router: Router) {
    if (localStorage.getItem('logueado') == 'true'){
      this.estaLogeado = true
      this.router.navigateByUrl('inicio');
    }else{
      this.estaLogeado = false
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('logueado') == 'true'){
      this.estaLogeado = true
      this.router.navigateByUrl('inicio');
    }else{
      this.estaLogeado = false
      this.router.navigateByUrl('login');
    }
  }
}

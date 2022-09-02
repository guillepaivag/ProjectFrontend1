import { Component, OnInit } from '@angular/core';
import { ServicePersonaService } from '../service/servicepersona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: String = '';
  public usuarios: any;
  public contrasenha: String = '';
  public mensajeError: String = '';

  constructor(
    private personaService: ServicePersonaService,
    private router: Router,
    private route : ActivatedRoute,) {
    const aux = localStorage.getItem('logueado')
    if (aux == 'true') {
      this.router.navigateByUrl('inicio');
    }
  }

  ngOnInit(): void {
  }

  public async iniciarSesion() {

    this.usuarios = this.personaService.getUsuarios();
    this.usuarios = await lastValueFrom(this.usuarios);

    console.log(this.usuarios.lista)

    for (let index = 0; index < this.usuarios.lista.length; index++) {
      const element = this.usuarios.lista[index];
      if (element.soloUsuariosDelSistema == null)
        if (this.usuario == element.email) {
          localStorage.setItem('usuarioNombre', element.nombre)
          localStorage.setItem('logueado', 'true')
          this.router.navigateByUrl('inicio');
          return
        }
    }
    this.mensajeError = "Usuario Incorrecto"
  }
}

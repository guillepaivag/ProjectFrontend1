import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Compartido } from '../service/global.service';

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
    private usuarioService: UsuarioService, 
    private route : ActivatedRoute, 
    private router : Router,
    private compartido: Compartido) { 
      if(this.compartido.estaLogeado == true) {
        this.router.navigateByUrl('inicio');
      }
  }

  ngOnInit(): void {
  }

  public async iniciarSesion(){

    this.usuarios = this.usuarioService.getUsuarios();
    this.usuarios = await lastValueFrom(this.usuarios);
    //this.router.navigateByUrl('/inicio');

    console.log(this.usuarios.lista)

    for (let index = 0; index < this.usuarios.lista.length; index++) {
      const element = this.usuarios.lista[index];
      if(element.soloUsuariosDelSistema == null)
      
        if(this.usuario == element.email) {
          this.compartido.estaLogeado = true
          this.compartido.usuario = this.usuario
          this.router.navigateByUrl('inicio');
          return
        } 
      
    }
    this.mensajeError="Usuario Incorrecto"
  }

}

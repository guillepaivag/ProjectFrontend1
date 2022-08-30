import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
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

  constructor( private usuarioService: UsuarioService, private route : ActivatedRoute, private router : Router) { 
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
        if(this.usuario == element.email)  this.router.navigateByUrl('/inicio');
      
    }
    this.mensajeError="Usuario Incorrecto"


    console.log(this.usuario)
  }

}

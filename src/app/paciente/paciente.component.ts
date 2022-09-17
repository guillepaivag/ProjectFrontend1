import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../service/pacientes.service';
import { Paciente } from '../model/paciente.model';
import { Persona } from '../model/persona.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[] = [];
  listaPacientes: Paciente[] = [];

  add=true
  idPersona:String=''

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  // imputs
  nombre:String=''
  apellido:String=''
  email:String=''
  telefono:String=''
  ruc:String=''
  cedula:String=''
  tipoPersona:String=''
  fechaNacimiento:String=''

  constructor(private pacientesService: PacientesService){
    this.refresh();
  }


  ngOnInit(): void {

    this.pacientesService.getPacientes().subscribe({
      next: (entity) => {this.pacientes = entity.lista; this.collectionSize = this.pacientes.length; this.refresh()},
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    
  }


  refresh() {
    this.listaPacientes = this.pacientes
      .map((listaPacientes, i) => ({id: i + 1, ...listaPacientes}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  agregar(){
    let p = new Paciente
    
    p.nombre=this.nombre
    p.apellido=this.apellido
    p.email=this.email
    p.telefono=this.telefono
    p.ruc=this.ruc
    p.cedula=this.cedula
    p.tipoPersona=this.tipoPersona
    p.fechaNacimiento=this.fechaNacimiento

    this.pacientesService.agregar(p).subscribe({
      next: (entity) => {console.log("Guardado ", entity); alert("Paciente Guardado")},
      error: (error) => console.log('no se pudo guardar', error),
    });
    this.ngOnInit()
  }

  eliminar(){
    this.pacientesService.borrar(this.idPersona).subscribe({
      next: (entity) => {
        alert("Paciente Eliminado")
        console.log("Guardado ", entity)
    },
      error: (error) => {
        alert("Paciente no se puede eliminar")
        console.log('no se pudo guardar', error)
      },
    });

    this.ngOnInit()
  }

  setDatosModificar(p: Paciente){
    this.add = false

    this.idPersona=p.idPersona
    this.nombre=p.nombre
    this.apellido=p.apellido
    this.email=p.email
    this.telefono=p.telefono
    this.ruc=p.ruc
    this.cedula=p.cedula
    this.tipoPersona=p.tipoPersona 
    this.fechaNacimiento=p.fechaNacimiento+" 00:00:00"


  }

  modificar(){
    this.add=true

    let p = new Paciente
    p.idPersona=this.idPersona
    console.log('p.idPersona',p.idPersona)
    p.nombre=this.nombre
    p.apellido=this.apellido
    p.email=this.email
    p.telefono=this.telefono
    p.ruc=this.ruc
    p.cedula=this.cedula
    p.tipoPersona=this.tipoPersona
    p.fechaNacimiento=this.fechaNacimiento

    this.pacientesService.actualizar(p).subscribe({
      next: (entity) => {console.log("Actualizado ", entity); alert("Paciente Guardado")},
      error: (error) => console.log('no se pudo actualizar', error),
    });

    this.nombre=""
    this.apellido=""
    this.email=""
    this.telefono=""
    this.ruc=""
    this.cedula=""
    this.tipoPersona=""
    this.fechaNacimiento=""
    this.ngOnInit()
  }


}



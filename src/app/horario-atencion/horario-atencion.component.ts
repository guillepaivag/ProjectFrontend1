import { Component, OnInit } from '@angular/core';
import { HorarioAtencion } from '../model/horario-atencion.model';
import { HorarioAtencionService } from '../service/horario-atencion.service';

@Component({
  selector: 'app-horario-atencion',
  templateUrl: './horario-atencion.component.html',
  styleUrls: ['./horario-atencion.component.css']
})
export class HorarioAtencionComponent implements OnInit {

  horarioAtencion: HorarioAtencion[] = [];
  listaHorarioAtencion: HorarioAtencion[] = [];

  add=true

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  // imputs
  idPersonaHorarioAgenda:string=''
  dia:string=''
  horaAperturaCadena:string=''
  horaCierreCadena:string=''
  intervaloMinutos:string=''
  idEmpleado={
    idPersona:''
  }
  

  constructor(private pacientesService: HorarioAtencionService){
    this.refresh();
  }


  ngOnInit(): void {

    this.pacientesService.obtener().subscribe({
      next: (entity) => {
        console.log()
        this.horarioAtencion = entity.lista; 
        this.collectionSize = this.horarioAtencion.length; 
        this.refresh()},
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    
  }


  refresh() {
    this.listaHorarioAtencion = this.horarioAtencion
      .map((listaHorarioAtencion, i) => ({id: i + 1, ...listaHorarioAtencion}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  agregar(){
    let p = new HorarioAtencion
    
    p.dia=this.dia
    p.horaAperturaCadena=this.horaAperturaCadena
    p.horaCierreCadena=this.horaCierreCadena
    p.intervaloMinutos=this.intervaloMinutos
    console.log(this.idEmpleado.idPersona)
    p.idEmpleado={
      idPersona: this.idEmpleado.idPersona
    }
    console.log(p.idEmpleado.idPersona)

    this.pacientesService.agregar(p).subscribe({
      next: (entity) => {console.log("Guardado ", entity); alert("HorarioAtencion Guardado")},
      error: (error) => console.log('no se pudo guardar', error),
    });

    this.ngOnInit()

  }

  eliminar(){
    this.pacientesService.borrar(this.idPersonaHorarioAgenda).subscribe({
      next: (entity) => {
        alert("HorarioAtencion Eliminado")
        console.log("Guardado ", entity)
    },
      error: (error) => {
        alert("HorarioAtencion no se puede eliminar")
        console.log('no se pudo guardar', error)
      },
    });

    this.ngOnInit()
  }

  setDatosModificar(p: HorarioAtencion){
    this.add = false

    this.idPersonaHorarioAgenda=p.idPersonaHorarioAgenda
    this.dia=p.dia
    this.horaAperturaCadena=p.horaAperturaCadena
    this.horaCierreCadena=p.horaCierreCadena
    this.intervaloMinutos=p.intervaloMinutos
    this.idEmpleado.idPersona=p.idEmpleado.idPersona

  }

  modificar(){
    this.add=true

    let p = new HorarioAtencion
    p.idPersonaHorarioAgenda=this.idPersonaHorarioAgenda
    p.dia=this.dia
    p.horaAperturaCadena=this.horaAperturaCadena
    p.horaCierreCadena=this.horaCierreCadena
    p.intervaloMinutos=this.intervaloMinutos
    p.idEmpleado={
      idPersona: this.idEmpleado.idPersona
    }

    console.log(p)

    this.pacientesService.actualizar(p).subscribe({
      next: (entity) => {console.log("Actualizado ", entity); alert("HorarioAtencion Guardado")},
      error: (error) => console.log('no se pudo actualizar', error),
    });

    this.dia=""
    this.horaAperturaCadena=""
    this.horaCierreCadena=""
    this.intervaloMinutos=""
    this.idEmpleado.idPersona=""
    this.ngOnInit()
  }
}

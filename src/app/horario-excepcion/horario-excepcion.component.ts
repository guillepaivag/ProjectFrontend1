import { Component, OnInit } from '@angular/core';
import { HorarioExcepcion } from '../model/horario-excepcion.model';
import { HorarioExcepcionService } from '../service/horario-excepcion.service';

@Component({
  selector: 'app-horario-excepcion',
  templateUrl: './horario-excepcion.component.html',
  styleUrls: ['./horario-excepcion.component.css']
})
export class HorarioExcepcionComponent implements OnInit {

  horarioExcepcion: HorarioExcepcion[] = [];
  listaHorarioExcepcion: HorarioExcepcion[] = [];

  add=true

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  // imputs
  horaAperturaCadena:string=''
  horaCierreCadena:string=''
  intervaloMinutos:string=''
  idEmpleado={
    idPersona:''
  }
  idHorarioExcepcion:string=''
  fechaCadena:string=''
  flagEsHabilitar:string=''

  

  constructor(private pacientesService: HorarioExcepcionService){
    this.refresh();
  }


  ngOnInit(): void {

    this.pacientesService.obtener().subscribe({
      next: (entity) => {
        console.log()
        this.horarioExcepcion = entity.lista; 
        this.collectionSize = this.horarioExcepcion.length; 
        this.refresh()},
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    
  }


  refresh() {
    this.listaHorarioExcepcion = this.horarioExcepcion
      .map((listaHorarioExcepcion, i) => ({id: i + 1, ...listaHorarioExcepcion}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  agregar(){
    let p = new HorarioExcepcion
    
    p.fechaCadena=this.fechaCadena
    p.flagEsHabilitar=this.flagEsHabilitar
    p.horaAperturaCadena=this.horaAperturaCadena
    p.horaCierreCadena=this.horaCierreCadena
    p.intervaloMinutos=this.intervaloMinutos
    console.log(this.idEmpleado.idPersona)
    p.idEmpleado={
      idPersona: this.idEmpleado.idPersona
    }
    console.log(p.idEmpleado.idPersona)

    this.pacientesService.agregar(p).subscribe({
      next: (entity) => {console.log("Guardado ", entity); alert("HorarioExcepcion Guardado")},
      error: (error) => console.log('no se pudo guardar', error),
    });
    this.ngOnInit()

  }

  eliminar(){
    this.pacientesService.borrar(this.idHorarioExcepcion).subscribe({
      next: (entity) => {
        alert("HorarioExcepcion Eliminado")
        console.log("Guardado ", entity)
    },
      error: (error) => {
        alert("HorarioExcepcion no se puede eliminar")
        console.log('no se pudo guardar', error)
      },
    });
    this.ngOnInit()

  }

  setDatosModificar(p: HorarioExcepcion){
    this.add = false

    this.flagEsHabilitar=p.flagEsHabilitar
    this.fechaCadena=p.fechaCadena
    this.horaAperturaCadena=p.horaAperturaCadena
    this.horaCierreCadena=p.horaCierreCadena
    this.intervaloMinutos=p.intervaloMinutos
    this.idEmpleado.idPersona=p.idEmpleado.idPersona
  }

  modificar(){
    this.add=true

    let p = new HorarioExcepcion
    p.idHorarioExcepcion=this.idHorarioExcepcion
    p.flagEsHabilitar=this.flagEsHabilitar
    p.fechaCadena=this.fechaCadena
    p.horaAperturaCadena=this.horaAperturaCadena
    p.horaCierreCadena=this.horaCierreCadena
    p.intervaloMinutos=this.intervaloMinutos
    p.idEmpleado={
      idPersona: this.idEmpleado.idPersona
    }

    this.pacientesService.actualizar(p).subscribe({
      next: (entity) => {console.log("Actualizado ", entity); alert("HorarioExcepcion Guardado")},
      error: (error) => console.log('no se pudo actualizar', error),
    });

    this.flagEsHabilitar=""
    this.fechaCadena=""
    this.horaAperturaCadena=""
    this.horaCierreCadena=""
    this.intervaloMinutos=""
    this.idEmpleado.idPersona=""

    this.ngOnInit()
  }

}

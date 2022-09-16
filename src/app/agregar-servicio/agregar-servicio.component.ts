import { Component, OnInit } from '@angular/core';
import { Servicio } from '../model/servicio.model';
import { ServiciosService } from '../service/servicios.service';


@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {

  servicios: Servicio[] = [];
  listaServicios: Servicio[] = [];
  serviciosCopia: Servicio[] = [];
  servicioSeleccionado?:Servicio
  observacion:String=''

  //filtros
  fecha: any;
  empleado: any;
  cliente: any;
  mensajeErrorFiltro = ''

  //modificacion
  index1: number = 0;
  flagAsistio: any = null

  //paginacion
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private servicioServices: ServiciosService){
    this.refresh();
  }

  ngOnInit(): void {

    this.servicioServices.getServicios().subscribe({
      next: (entity) => {
        this.servicios = entity.lista;
        console.log(entity);
        this.collectionSize = this.servicios.length;
        this.refresh()
        this.serviciosCopia = this.servicios.map((x) => x)
      },
      error: (error) => console.log('no se pudieron conseguir los servicios', error),
    });
  }



  refresh() {
    console.log('refresh')
    this.listaServicios = this.servicios
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  filtrar(){

    if(!this.empleado && !this.cliente){ 
      this.ngOnInit(); 
      return
    }

    this.servicioServices.getServiciosFiltrado(this.empleado,this.cliente).subscribe({
      next: (entity) => {
        console.log(entity)
        this.servicios=entity.lista
        this.collectionSize=this.servicios.length
        this.refresh()
      },
      error: (error) => console.log('no se pudo obtener', error),
    });

    
  }

  agregar(){
    let p = new Servicio

    if(this.servicioSeleccionado){
    
      p.idFichaClinica.idFichaClinica=this.servicioSeleccionado.idFichaClinica.idFichaClinica
      p.observacion=this.observacion

      this.servicioServices.agregarServicio(p).subscribe({
        next: (entity) => {console.log("Guardado ", entity); alert("Servicio Guardado")},
        error: (error) => console.log('no se pudo guardar', error),
      });

    }else{
      alert("Seleccione una ficha")
    }

  }

}

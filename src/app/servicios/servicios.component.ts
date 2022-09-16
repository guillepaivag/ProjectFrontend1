import { Component, OnInit } from '@angular/core';
import { Servicio } from '../model/servicio.model';
import { ServiciosService } from '../service/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  listaServicios: Servicio[] = [];
  ServiciosCopia: Servicio[] = [];

  //filtros
  fechaDesde: any;
  fechaHasta: any;
  nombreEmpleado: any;
  nombreCliente: any;
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

        for (let index = 0; index < this.servicios.length; index++){
          let fechaCadena = this.servicios[index].fechaHoraCadena
          this.servicios[index].fechaHoraCadena=fechaCadena.substring(0, 4)+"-"+fechaCadena.substring(4, 6)+"-"+fechaCadena.substring(6, 8)
        }

        this.ServiciosCopia = this.servicios.map((x) => x)
        this.collectionSize = this.servicios.length;
        this.refresh()
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

    this.servicios = this.ServiciosCopia.map((x) => x)

    if(this.fechaDesde > this.fechaHasta){
      this.mensajeErrorFiltro="Las fecha desde debe ser menor a la fecha hasta"
      return
    } else if(!this.fechaDesde && this.fechaHasta || this.fechaDesde && !this.fechaHasta){
      this.mensajeErrorFiltro="Debe colocar ambas fechas"
      return
    }

    let nuevoServicios = []
    let element: any;

    if(this.fechaDesde){
      for (let index = 0; index < this.ServiciosCopia.length; index++) {

        element = this.servicios[index];
        let date1 = new Date(element.fechaHoraCadena).getTime();
        let date2 = new Date(this.fechaDesde).getTime();
        let date3 = new Date(this.fechaHasta).getTime();

        if(date1 >= date2 && date1 <= date3 )
        nuevoServicios.push(this.servicios[index])
      }
    } else{
      nuevoServicios = this.servicios
    }



    if(this.nombreEmpleado){
      let aux2 = []

      for (let index = 0; index < nuevoServicios.length; index++) {
        element = nuevoServicios[index];
        console.log('this.nombreEmpleado',this.nombreEmpleado ,'element.idEmpleado.nombre', element.idEmpleado.nombre)
        if( element.idEmpleado.nombre.toLowerCase().includes(this.nombreEmpleado.toLowerCase())  )
          aux2.push(element)
      }
      console.log(aux2,nuevoServicios)
      nuevoServicios=aux2
    }



    if(this.nombreCliente){
      let aux2 = []
      for (let index = 0; index < nuevoServicios.length; index++) {
        element = nuevoServicios[index];
        if(element.idCliente.nombre.toLowerCase().includes(this.nombreCliente.toLowerCase()) )
          aux2.push(element)
      }
      nuevoServicios=aux2
    }

    this.collectionSize=nuevoServicios.length
    this.servicios=nuevoServicios
    this.refresh()


  }
}

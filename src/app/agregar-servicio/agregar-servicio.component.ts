import { Component, OnInit } from '@angular/core';
import { Servicio } from '../model/servicio.model';
import { ServiciosService } from '../service/servicios.service';
import { FichaClinica } from '../model/ficha-clinica.model';
import { ActivatedRoute } from '@angular/router';
import { Detalle } from '../model/detalle.model';



@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {

  servicios: FichaClinica[] = [];
  listaServicios: FichaClinica[] = [];
  serviciosCopia: FichaClinica[] = [];
  servicioSeleccionado?:FichaClinica
  observacion:String=''

  //filtros
  fecha = formatDate(String(new Date()))
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

  // item
  categoria?:string
  subcategoria?:string
  tipoServicio?:string
  precio?:string
  cantidad?:string

  idServicio?:string='2'
  listaDetalles?:Detalle[]
  detalles?:Detalle[]

  // modal
  seGuardo=false
  esActualizar = false



  constructor(private servicioServices: ServiciosService, private route: ActivatedRoute){
    this.refresh();
  }

  ngOnInit(): void {

      this.route.params.subscribe(params => {
        if(params['id'] !== "crear"){
          this.idServicio = params['id']; 
          this.esActualizar = true
        } else
          this.esActualizar = false
    });

    if(this.esActualizar) {
      this.servicioServices.getServicio(this.idServicio).subscribe({
        next: (entity) => {
          this.servicioServices.getFichaClinicaServicio(entity.idFichaClinica.idFichaClinica).subscribe({
            next: (entity2) => {
              this.servicios[0] = entity2;
              this.collectionSize = 1;
              this.refresh()
              this.serviciosCopia = this.servicios.map((x) => x)
            },
            error: (error) => console.log('no se pudieron conseguir los servicios', error),
          })
        },
        error: (error) => console.log('no se pudieron conseguir los servicios', error),
      })
    }

    this.servicioServices.getFichaClinica().subscribe({
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

    let fecha = formatDateBD(this.fecha)

    console.log(this.empleado,this.cliente, fecha)
    this.servicioServices.getFichaClinicaFiltrado(this.empleado,this.cliente, fecha).subscribe({
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
    let p = {
      idFichaClinica:{
        idFichaClinica:''
      },
      observacion:''
    }

    if(this.servicioSeleccionado){
    
      p.idFichaClinica={
        idFichaClinica: String(this.servicioSeleccionado.idFichaClinica)
      }
      
      p.observacion=String(this.observacion)

      this.servicioServices.agregarServicio(p).subscribe({
        next: (entity) => {
          console.log("Guardado ", entity); 
          alert("Servicio Guardado");
          if(entity.idServicio)
            this.idServicio = entity.idServicio
        },
        error: (error) => console.log('no se pudo guardar', error),
      });

      this.seGuardo = true

      

    }else{
      this.seGuardo = false
      alert("Seleccione una ficha")
    }

  }

  agregarDetalle(){

    let p = {
      cantidad: this.cantidad,
      idPresentacionProducto:{
        idPresentacionProducto:this.tipoServicio
      },
      idServicio:{
        idServicio:this.idServicio
      }
    }
    
    this.servicioServices.agregarDetalle(this.idServicio,p).subscribe({
      next: (entity) => {console.log("Guardado ", entity); alert("Detalle Guardado")},
      error: (error) => console.log('no se pudo guardar', error),
    });
  }

  cancelar(){
    this.categoria=''
    this.subcategoria=''
    this.tipoServicio=''
    this.precio=''
    this.cantidad=''
  }

}


function formatDate(date: string) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function formatDateBD(date: string) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('');
}



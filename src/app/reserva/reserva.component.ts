import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { Reserva } from '../model/reserva.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reserva: Reserva[] = [];
  listaReserva: Reserva[] = [];
  reservaCopia: Reserva[] = [];

  // filtros
  fechaDesde: any;
  fechaHasta: any;
  nombreEmpleado: any;
  nombreCliente: any;
  mensajeErrorFiltro = ''

  //modificacion
  modificar:Modificar[]=[]
  index1: number = 0;
  flagAsistio: any = null

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private reservaService: ReservaService){
    this.refresh();
  }


  ngOnInit(): void {

    this.reservaService.getReservas().subscribe({
      next: (entity) => {
        this.reserva = entity.lista; 
        for (let index = 0; index < this.reserva.length; index++) {
          this.reserva[index].fechaCadena=this.reserva[index].fechaCadena.substring(0, 4)
          +"-"+this.reserva[index].fechaCadena.substring(4, 6)
          +"-"+this.reserva[index].fechaCadena.substring(6, 8)
          let modificarValores = {
            idReserva:this.reserva[index].idReserva,
            observacion:this.reserva[index].observacion,
            flagAsistio:this.reserva[index].flagAsistio
          }
          this.modificar[index]=modificarValores
        }
        
        this.reservaCopia = this.reserva.map((x) => x)
        this.collectionSize = this.reserva.length;
        this.refresh()
      },
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    
  }


  refresh() {
    this.listaReserva = this.reserva
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  cancelarReserva(id: number){
    this.reservaService.borrarReserva(id).subscribe({
      next: (entity) => console.log('reserva borrada', entity),
      error: (error) => console.log('no se pudo borrar la reserva', error),
    });

  }

  filtrar(){

    this.reserva = this.reservaCopia.map((x) => x)

    
    if(this.fechaDesde > this.fechaHasta){
      this.mensajeErrorFiltro="Las fecha desde debe ser menor a la fecha hasta"
      return
    } else if(!this.fechaDesde && this.fechaHasta || this.fechaDesde && !this.fechaHasta){
      this.mensajeErrorFiltro="Debe colocar ambas fechas"
      return
    } 

    let nuevoReservas = []
    let element: any;

    if(this.fechaDesde){

      for (let index = 0; index < this.reserva.length; index++) {

        element = this.reserva[index];
        let date1 = new Date(element.fechaCadena).getTime();
        let date2 = new Date(this.fechaDesde).getTime();
        let date3 = new Date(this.fechaHasta).getTime();
        
        if(date1 >= date2 && date1 <= date3 )
          nuevoReservas.push(this.reserva[index])
      }
    } else{
      nuevoReservas = this.reserva
    }



    if(this.nombreEmpleado){
      let aux2 = []
      
      for (let index = 0; index < nuevoReservas.length; index++) {
        element = nuevoReservas[index];
        console.log('this.nombreEmpleado',this.nombreEmpleado ,'element.idEmpleado.nombre', element.idEmpleado.nombre)
        if(element.idEmpleado.nombre.trim() == this.nombreEmpleado.trim()  )
          aux2.push(element)
      }
      console.log(aux2,nuevoReservas)
      nuevoReservas=aux2
    }

   

    if(this.nombreCliente){
      let aux2 = []
      for (let index = 0; index < nuevoReservas.length; index++) {
        element = nuevoReservas[index];
        if(element.idCliente.nombre.trim()  == this.nombreCliente.trim()  )
          aux2.push(element)
      }
      nuevoReservas=aux2
    }

    this.collectionSize=nuevoReservas.length
    this.reserva=nuevoReservas
    this.refresh()
    

  }

  setIndex(index:number){
    this.index1=index

  }

  guardarEdicion(){
    

    if(this.modificar[this.index1].flagAsistio){
      this.modificar[this.index1].flagAsistio = 'S'
    } else {
      this.modificar[this.index1].flagAsistio = 'N'
    }

    console.log(this.modificar[this.index1])
    
    this.reservaService.actualizarReserva(this.modificar[this.index1]).subscribe({
      next: (entity) => console.log('actualizado', entity),
      error: (error) => console.log('no se pudo actualizar la reserva', error),
    });
    
  }

}

export class Modificar{
  idReserva!:number
  observacion!:String
  flagAsistio!:String
}
  

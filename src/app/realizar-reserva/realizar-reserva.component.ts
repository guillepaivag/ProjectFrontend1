import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { Reserva } from '../model/reserva.model';

@Component({
  selector: 'app-realizar-reserva',
  templateUrl: './realizar-reserva.component.html',
  styleUrls: ['./realizar-reserva.component.css']
})
export class RealizarReservaComponent implements OnInit {

  // filtros
  idEmpleado = localStorage.getItem('usuarioId')
  mensajeErrorFiltro = ''
  mostrarReservados = false

  flagDisponible = ''
  fecha = formatDate(String(new Date()))

  // paginacion
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  reservas: Reserva[] = [];
  listaReserva: Reserva[] = [];
  reservaCopia: Reserva[] = [];

  //nueva reserva
  idCliente: string=''
  observacion: string=''
  index:number=-1
  reservaGuardada=false
  reservaAGuardar:Reserva= new Reserva;


  constructor(private reservaService: ReservaService) {
    this.refresh();
  }

  refresh() {
    this.listaReserva = this.reservas
      .map((listaPacientes, i) => ({ id: i + 1, ...listaPacientes }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.fecha = formatDate(String(new Date()))
    console.log(this.fecha)
    this.flagDisponible
    this.reservaService.obtenerTodasHorasReservas([], Number(localStorage.getItem('usuarioId')), '20190903' /*this.fecha*/, this.flagDisponible).subscribe({
      next: (entity) => {
        this.reservas = entity
        this.collectionSize = this.reservas.length;
        console.log(this.reservas)
        this.refresh()
        this.reservaCopia = this.reservas.map((x) => x)
      },
      error: (error) => console.log(error)
    })


  }

  filtrar() {

    this.reservas = this.reservaCopia.map((x) => x)


    if (this.idEmpleado && this.fecha && this.mostrarReservados) {
      this.reservaService.obtenerTodasHorasReservas(['Disponible'], Number(this.idEmpleado), formatDateBD(this.fecha), this.mostrarReservados ? "S" : "N").subscribe({
        next: (entity) => {
          this.reservas = entity
          this.collectionSize = this.reservas.length;
          console.log(this.reservas)
          this.refresh()
        },
        error: (error) => console.log(error)
      })
    } else if(this.idEmpleado) {
      this.reservaService.obtenerTodasHorasReservas([], Number(this.idEmpleado), formatDateBD(this.fecha), this.flagDisponible).subscribe({
        next: (entity) => {
          this.reservas = entity
          this.collectionSize = this.reservas.length;
          console.log(this.reservas)
          this.refresh()
        },
        error: (error) => console.log(error)
      })
    } else if (this.mostrarReservados){
      this.reservaService.obtenerTodasHorasReservas(['Disponible'], Number(this.idEmpleado), formatDateBD(this.fecha), this.mostrarReservados ? "S" : "N").subscribe({
        next: (entity) => {
          this.reservas = entity
          this.collectionSize = this.reservas.length;
          console.log(this.reservas)
          this.refresh()
        },
        error: (error) => console.log(error)
      })
    } else {
      this.reservaService.obtenerTodasHorasReservas(['Disponible'], 2/*Number(localStorage.getItem('usuarioId'))*/, formatDateBD(this.fecha), this.flagDisponible).subscribe({
        next: (entity) => {
          this.reservas = entity
          this.collectionSize = this.reservas.length;
          console.log(this.reservas)
          this.refresh()
        },
        error: (error) => console.log(error)
      })
    }


  }

  agregarReserva(){
    if(this.reservaAGuardar.fechaCadena && this.idCliente){
      let reserva:ReservaPost = new ReservaPost()


      reserva.observacion=this.observacion
      reserva.fechaCadena=this.reservaAGuardar.fechaCadena
      reserva.horaInicioCadena=this.reservaAGuardar.horaInicioCadena
      reserva.horaFinCadena=this.reservaAGuardar.horaInicioCadena
      reserva.idEmpleado = {
        idPersona: this.reservaAGuardar.idEmpleado.idPersona,
      }
      reserva.idCliente = {
        idPersona: this.idCliente,
      }

      this.reservaService.agregarReserva(reserva).subscribe({
        next: (entity) => {
          this.reservaGuardada = true
          console.log(entity)
          alert("Reserva Agregada")
        },
        error: (error) => console.log(error)
      })

    } else {
      this.mensajeErrorFiltro = "Seleccione una opcion y un cliente"
    }

  }

}

class ReservaPost{
  observacion!:String
  fechaCadena!: String
  horaInicioCadena!: String
  horaFinCadena!:String
  idEmpleado!:{
      idPersona:String
  }
  idCliente!:{
      idPersona:String
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
import { Component, OnInit } from '@angular/core';
import { FichaClinicaService } from '../service/ficha-clinica.service';
import { FichaClinica } from '../model/ficha-clinica.model';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {

  fichas: FichaClinica[] = [];
  listaFichas: FichaClinica[] = [];
  fichasCopia: FichaClinica[] = [];

  //filtros
  fechaDesde: any;
  fechaHasta: any;
  nombreEmpleado: any;
  nombreCliente: any;
  mensajeErrorFiltro = ''

  //modificacion
  modificar:Modificar[]=[]
  index1: number = 0;
  flagAsistio: any = null

  //paginacion
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private fichaClinicaService: FichaClinicaService){
    this.refresh();
  }

  ngOnInit(): void {

    this.fichaClinicaService.getFichaClinica().subscribe({
      next: (entity) => {
        this.fichas = entity.lista;
        for (let index = 0; index < this.fichas.length; index++) {
          let fechaCadena = this.fichas[index].fechaHoraCadena
          console.log('fechaCadena',fechaCadena)
          this.fichas[index].fechaHoraCadena=fechaCadena.substring(0, 4)+"-"+fechaCadena.substring(4, 6)+"-"+fechaCadena.substring(6, 8)
          let modificarValores = {
            idFichaClinica:this.fichas[index].idFichaClinica,
            motivo_consulta:this.fichas[index].motivo_consulta,
            diagnostico:this.fichas[index].diagnostico,
            tratamiento:this.fichas[index].tratamiento,
            observacion:this.fichas[index].observacion,
          }
          this.modificar[index]=modificarValores
        }

        this.fichasCopia = this.fichas.map((x) => x)
        this.collectionSize = this.fichas.length;
        this.refresh()
      },
      error: (error) => console.log('no se pudieron conseguir las fichas', error),
    });
  }



  refresh() {
    console.log('refresh')
    this.listaFichas = this.fichas
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  filtrar(){

    this.fichas = this.fichasCopia.map((x) => x)


    if(this.fechaDesde > this.fechaHasta){
      this.mensajeErrorFiltro="Las fecha desde debe ser menor a la fecha hasta"
      return
    } else if(!this.fechaDesde && this.fechaHasta || this.fechaDesde && !this.fechaHasta){
      this.mensajeErrorFiltro="Debe colocar ambas fechas"
      return
    }

    let nuevoFichas = []
    let element: any;

    if(this.fechaDesde){

      for (let index = 0; index < this.fichas.length; index++) {

        element = this.fichas[index];
        let date1 = new Date(element.fechaHoraCadena).getTime();
        let date2 = new Date(this.fechaDesde).getTime();
        let date3 = new Date(this.fechaHasta).getTime();

        if(date1 >= date2 && date1 <= date3 )
          nuevoFichas.push(this.fichas[index])
      }
    } else{
      nuevoFichas = this.fichas
    }



    if(this.nombreEmpleado){
      let aux2 = []

      for (let index = 0; index < nuevoFichas.length; index++) {
        element = nuevoFichas[index];
        console.log('this.nombreEmpleado',this.nombreEmpleado ,'element.idEmpleado.nombre', element.idEmpleado.nombre)
        if( element.idEmpleado.nombre.toLowerCase().includes(this.nombreEmpleado.toLowerCase())  )
          aux2.push(element)
      }
      console.log(aux2,nuevoFichas)
      nuevoFichas=aux2
    }



    if(this.nombreCliente){
      let aux2 = []
      for (let index = 0; index < nuevoFichas.length; index++) {
        element = nuevoFichas[index];
        if(element.idCliente.nombre.toLowerCase().includes(this.nombreCliente.toLowerCase()) )
          aux2.push(element)
      }
      nuevoFichas=aux2
    }

    this.collectionSize=nuevoFichas.length
    this.fichas=nuevoFichas
    this.refresh()


  }
}

export class Modificar{
  idFichaClinica!: number;
  motivo_consulta!: String;
  diagnostico!: String;
  tratamiento!: String;
  observacion!: String;
}
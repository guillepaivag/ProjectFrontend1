import { Component, OnInit } from '@angular/core';
import { FichaClinicaService } from '../service/ficha-clinica.service';
import { FichaClinica } from '../model/ficha-clinica.model';
import { Categoria } from '../model/categoria.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicioService } from '../service/servicio.service';
import { Servicio } from '../model/servicio.model';

@Component({
  selector: 'app-agregar-ficha',
  templateUrl: './agregar-ficha.component.html',
  styleUrls: ['./agregar-ficha.component.css']
})
export class AgregarFichaComponent implements OnInit {

  servicios: Servicio[] = [];
  listaServicios: Servicio[] = [];
  serviciosCopia: Servicio[] = [];

  //valores a cargar
  fecha: String = '';
  motivo_consulta: String = '';
  diagnostico: String = '';
  observacion: String = '';
  nombreEmpleado: any;
  nombreCliente: any;

  //filtros
  listaCategorias: Categoria[] = [];
  listaTipoProducto: TipoProducto[] = [];
  idCategoriaSeleccionada: string = '';
  idTipoProductoSeleccionado: any;
  mensajeErrorFiltro = ''

  //modificacion
  index1: number = 0;
  flagAsistio: any = null

  //paginacion
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private ServicioService: ServicioService,private servicioCategorias: ServicecategoriaService, private fichaClinicaService: FichaClinicaService) { 
    this.refresh();
  }

  ngOnInit(): void {

    this.ServicioService.getServicios().subscribe({
      next: (entity) => {
        this.servicios = entity.lista;

        this.serviciosCopia = this.servicios.map((x) => x)
        this.collectionSize = this.servicios.length;
        this.refresh()
      },
      error: (error) => console.log('no se pudieron conseguir las fichas', error),
    });

    //para la lista de Categorias y Tipo de Producto (subcategorias)
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => { this.listaCategorias = entity.lista; },
      error: (error) => console.log('no se pudieron conseguir las categorias'+ JSON.stringify(error)),
    });
  }

  getTipoProductosLikeId(){
    if (this.idCategoriaSeleccionada){
      console.log('gettipoproductoslikeid '+this.idCategoriaSeleccionada)
      this.idTipoProductoSeleccionado = ''
      this.servicioCategorias.getTipoProductosLikeId(this.idCategoriaSeleccionada).subscribe({
        next: (entity) => { this.listaTipoProducto = entity.lista; },
        error: (error) => console.log('no se pudieron conseguir los productos con el filtro'+ JSON.stringify(error))
      });
    }
  }


  refresh() {
    console.log('refresh')
    this.listaServicios = this.servicios
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  guardar() {
    console.log('guardar')
    let ficha = new FichaClinica();
    //ficha.fechaHora = this.fecha;
    ficha.motivo_consulta = this.motivo_consulta;
    ficha.diagnostico = this.diagnostico;
    ficha.observacion = this.observacion;
    //todo: empleado, cliente y tipoproducto deben ser variables de tipo persona y tipoproducto
    ficha.idEmpleado = {
      "idPersona": this.nombreEmpleado.idPersona,
      "nombre": "",
      "apellido": "",
    };
    ficha.idCliente = {
      "idPersona": this.nombreCliente,
      "nombre": "",
      "apellido": "",
    };
    ficha.idTipoProducto = {
      "idTipoProducto": this.idTipoProductoSeleccionado,
      "idCategoria" : {
        "idCategoria": this.idCategoriaSeleccionada,
        "descripcion": "",
      },
    };

    this.fichaClinicaService.guardar(ficha).subscribe({
      next: (entity) => {console.log("Guardado ", entity); alert("Paciente Guardado")},
      error: (error) => console.log('no se pudo guardar', error),
    });
  }

  limpiar(){
    this.idCategoriaSeleccionada = ''
    this.idTipoProductoSeleccionado = ''
    this.nombreEmpleado = ''
    this.nombreCliente = ''
    this.fecha = ''
    this.motivo_consulta = ''
    this.diagnostico = ''
    this.observacion = ''
    this.refresh()
  }

}

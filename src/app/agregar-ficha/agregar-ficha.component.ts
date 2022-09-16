import { Component, OnInit } from '@angular/core';
import { FichaClinicaService } from '../service/ficha-clinica.service';
import { FichaClinica } from '../model/ficha-clinica.model';
import { Categoria } from '../model/categoria.model';
import { TipoProducto } from '../model/tipo-producto.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { ServicioService } from '../service/servicio.service';
import { Servicio } from '../model/servicio.model';
import { PacientesService } from '../service/pacientes.service';
import { Persona } from '../model/persona.model';
import { Paciente } from '../model/paciente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-ficha',
  templateUrl: './agregar-ficha.component.html',
  styleUrls: ['./agregar-ficha.component.css'],
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
  empleado: Persona = new Persona();
  cliente: Paciente = new Paciente();
  nombreEmpleadoBuscar: String = '';
  nombrePacienteBuscar: String = '';

  //filtros
  listaCategorias: Categoria[] = [];
  listaTipoProducto: TipoProducto[] = [];
  idCategoriaSeleccionada: string = '';
  idTipoProductoSeleccionado: any;
  mensajeErrorFiltro = '';

  //modificacion
  index1: number = 0;
  flagAsistio: any = null;

  //paginacion
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(
    private ServicioService: ServicioService,
    private servicioCategorias: ServicecategoriaService,
    private fichaClinicaService: FichaClinicaService,
    private pacientesService: PacientesService,
    private router: Router
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.ServicioService.getServicios().subscribe({
      next: (entity) => {
        this.servicios = entity.lista;

        this.serviciosCopia = this.servicios.map((x) => x);
        this.collectionSize = this.servicios.length;
        this.refresh();
      },
      error: (error) =>
        console.log('no se pudieron conseguir las fichas', error),
    });

    //para la lista de Categorias y Tipo de Producto (subcategorias)
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => {
        this.listaCategorias = entity.lista;
      },
      error: (error) =>
        console.log(
          'no se pudieron conseguir las categorias' + JSON.stringify(error)
        ),
    });
    this.fecha = new Date().toLocaleDateString();
  }

  getTipoProductosLikeId() {
    if (this.idCategoriaSeleccionada) {
      console.log('gettipoproductoslikeid ' + this.idCategoriaSeleccionada);
      this.idTipoProductoSeleccionado = '';
      this.servicioCategorias
        .getTipoProductosLikeId(this.idCategoriaSeleccionada)
        .subscribe({
          next: (entity) => {
            this.listaTipoProducto = entity.lista;
          },
          error: (error) =>
            console.log(
              'no se pudieron conseguir los productos con el filtro' +
                JSON.stringify(error)
            ),
        });
    }
  }

  refresh() {
    console.log('refresh');
    this.listaServicios = this.servicios.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  guardar() {
    console.log('guardar');
    let ficha = new FichaClinica();
    ficha.motivoConsulta = this.motivo_consulta;
    ficha.diagnostico = this.diagnostico;
    ficha.observacion = this.observacion;
    //todo: empleado, cliente y tipoproducto deben ser variables de tipo persona y tipoproducto
    ficha.idEmpleado = {
      'idPersona': this.empleado.idPersona
    }
    ficha.idCliente = {
      'idPersona': this.cliente.idPersona
    }
    ficha.idTipoProducto = {
      'idTipoProducto': Number(this.idTipoProductoSeleccionado)
    }
    console.log(JSON.stringify(ficha))

    this.fichaClinicaService.guardar(ficha).subscribe({
      next: (entity) => {
        console.log('Guardado ', entity);
      },
      error: (error) => {
        console.log('no se pudo guardar', error)
        alert('Ficha no se pudo crear');
     },
    });

    alert('Se guardo correctamente')
    this.router.navigate(['/ficha-clinica']);

  };

  buscarEmpleado() {
    this.pacientesService.getEmpleadoPorNombre(this.nombreEmpleadoBuscar).subscribe({
      next: (entity) => {
        if (entity.lista[0] != undefined ){
          this.empleado = entity.lista[0]
        }else{
          alert('Empleado no existe');
        }
      },
      error: (error) => {
        console.log('no se pudo encontrar', error)
        alert('Empleado no existe');
      },
    });
  }

  buscarCliente() {
    this.pacientesService.getPacientePorNombre(this.nombrePacienteBuscar).subscribe({
      next: (entity) => {
        if (entity.lista[0] != undefined ){
          this.cliente = entity.lista[0]
        }else{
          alert('Cliente no existe');
        }
      },
      error: (error) => {
        console.log('no se pudo encontrar', error)
        alert('Cliente no existe');
      },
    });
  }

  limpiar() {
    this.idCategoriaSeleccionada = '';
    this.idTipoProductoSeleccionado = '';
    this.empleado = new Persona();
    this.cliente = new Paciente();
    this.empleado.nombre = ''
    this.cliente.nombre = ''
    this.nombreEmpleadoBuscar = '';
    this.fecha = '';
    this.motivo_consulta = '';
    this.diagnostico = '';
    this.observacion = '';
    this.refresh();
  }
}

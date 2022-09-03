import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../service/pacientes.service';
import { Paciente } from '../model/paciente.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[] = [];
  listaPacientes: Paciente[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private pacientesService: PacientesService){
    this.refresh();
  }


  ngOnInit(): void {

    this.pacientesService.getPacientes().subscribe({
      next: (entity) => {this.pacientes = entity.lista; this.collectionSize = this.pacientes.length; this.refresh()},
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
    
  }


  refresh() {
    this.listaPacientes = this.pacientes
      .map((listaPacientes, i) => ({id: i + 1, ...listaPacientes}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

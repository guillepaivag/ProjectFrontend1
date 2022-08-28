import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { ServicecategoriaService } from '../service/servicecategoria.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {

  categoriaGuardar: Categoria = new Categoria();

  mensaje: String = '';

  categorias: Categoria[] = [];

  constructor(private servicioCategorias: ServicecategoriaService) { }

  ngOnInit(): void {
    this.servicioCategorias.getCategorias().subscribe({
      next: (entity) => this.categorias = entity.lista,
      error: (error) => console.log('no se pudieron conseguir las categorias', error),
    });
  }

  guardarCategoria(): void{
    this.servicioCategorias.guardarCategoria(this.categoriaGuardar).subscribe({
      next: (entity) => {
        this.mensaje = 'Agregado exitosamente'
        this.categorias.push(entity)
      },
      error: (error) => console.log("error: " + error),
    })
  };
}

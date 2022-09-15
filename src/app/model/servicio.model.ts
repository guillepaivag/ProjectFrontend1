export class Servicio {
  idFichaClinica={
    idFichaClinica : String,
    fechaHora : String,
    idCliente : {
      idCliente : String,
      nombre : String,
      apellido : String,
    },
    idTipoProducto : {
      idCategoria : {
        idCategoria : String,
        descripcion : String,
      },
    },
  };
  idEmpleado={
    apellido : String,
    nombre : String,
  };


  fechaHora= {FechaHora : String};
  observacion! : String;
}


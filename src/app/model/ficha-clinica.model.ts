import { Paciente } from "./paciente.model";
import { Persona } from "./persona.model";
import { TipoProducto } from "./tipo-producto.model";

export class FichaClinica {
    idFichaClinica!: number;
    fechaHora!: String;
    fechaHoraCadena!:String;
    motivoConsulta!: String;
    diagnostico!: String;
    tratamiento!: String;
    observacion!: String;
    idEmpleado: any;
    idCliente: any;
    idTipoProducto: any;
}

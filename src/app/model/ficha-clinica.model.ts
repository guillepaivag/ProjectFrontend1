import { Persona } from "./persona.model";
import { TipoProducto } from "./tipo-producto.model";

export class FichaClinica {
    idFichaClinica!: number;
    fechaHora!: String;
    fechaHoraCadena!:String;
    motivo_consulta!: String;
    diagnostico!: String;
    tratamiento!: String;
    observacion!: String;
    idEmpleado: Persona = new Persona;
    idCliente: Persona = new Persona;
    idTipoProducto: TipoProducto = new TipoProducto;
}

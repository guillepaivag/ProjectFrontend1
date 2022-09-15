import { Persona } from "./persona.model";
import { FichaClinica } from "./ficha-clinica.model";

export class Servicio {
    idServicio!: number;
    fechaHora!: String;
    presupuesto!: number;
    idFichaClinica: FichaClinica = new FichaClinica;
    idEmpleado: Persona = new Persona;
    usuario: Persona = new Persona; //idCliente
}

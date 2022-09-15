import { Persona } from "./persona.model";
import { FichaClinica } from "./ficha-clinica.model";
export class Servicio {
  idServicio!: number;
  fechaHora= {FechaHora : String};
  observacion! : String;
  presupuesto!: number;
  idFichaClinica: FichaClinica = new FichaClinica;
  idEmpleado: Persona = new Persona;
  usuario: Persona = new Persona; //idCliente
}
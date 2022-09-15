export class HorarioAtencion {
    idPersonaHorarioAgenda!:string
    dia!: string
    horaAperturaCadena!: string
    horaCierreCadena!: string
    intervaloMinutos!: string
    idEmpleado!: {
        idPersona: string
    }
}

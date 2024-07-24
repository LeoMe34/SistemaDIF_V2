import { writeFile, utils } from 'xlsx';

const convertirConsulta = (consulta) => {
    switch (consulta) {
        case "1":
            return "TDAH";
        case "2":
            return "Duelo";
        case "3":
            return "Problemas de pareja";
        case "4":
            return "Ansiedad";
        case "5":
            return "Problema conductual";
        case "6":
            return "Transtorno depresivo";
        case "7":
            return "Problema de aprendizaje";
        case "8":
            return "Separación de padres";
        case "9":
            return "Manejo de impulsos";
        case "10":
            return "Abuso sexual";
        case "11":
            return "Autoestima";
        case "12":
            return "Audiencia";
        case "13":
            return "Brigada";
        case "14":
            return "Terapia grupal";
        default:
            return "Ninguno";
    }
}

const convertirVisita = (visita) => {
    switch (visita) {
        case "1":
            return "Primera vez";
        case "2":
            return "Subsecuente";
        default:
            return "Ninguno";
    }
}

const generarExcel = (nombre, cedula, fichalPsico, detallesPacientes, fechaActual) => {
    const datos = [
        ['Nombre del Psicólogo:', nombre],         
        ['Cédula Profesional:', cedula], 
        [],
        ['No.Expediente', 'Nombre', 'Edad', 'Domicilio', 'Teléfono', 'Motivo de consulta', 'Valoración', 'Visita'],
        ...fichalPsico.map((ficha, index) => [
            ficha.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            `${detallesPacientes[index]?.datosDireccionPacient?.direccion}, ${detallesPacientes[index]?.datosDireccionPacient?.colonia}`,
            detallesPacientes[index]?.datosContactoPacient?.telefono,
            convertirConsulta(ficha.visita.tipo_consulta),
            ficha.tratamiento.valoracion,
            convertirVisita(ficha.visita.tipo_visita)
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Hoja Diaria Psicología');

    writeFile(workbook, `HOJA_DIARIA_PSICOLOGIA_${nombre}_${fechaActual}.xlsx`);
};

export default generarExcel;

import { writeFile, utils } from 'xlsx';

const convertirReferencia = (referencia) => {
    if (referencia.referenciaMed.referencia) {
        return "Sí"
    } else {
        return "No"
    }
}

const convertirEstudios = (estudio) => {
    switch (estudio) {
        case "0":
            return "Ninguno";
        case "1":
            return "Laboratorios";
        case "2":
            return "Ultrasonido";
        case "3":
            return "Tomografía";
        case "4":
            return "Rayos X";
        default:
            return "Ninguno";
    }
}

const generarExcel = (nombre, cedula, historialClinico, detallesPacientes, fechaActual) => {
    const datos = [
        ['Nombre del Médico:', nombre],         
        ['Cédula Profesional:', cedula], 
        [],
        ['No.Expediente', 'Nombre', 'Sexo', 'Edad', 'Referencia', 'Estudios externos', 'Diagnóstico'],
        ...historialClinico.map((historial, index) => [
            historial.no_expediente.no_expediente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            convertirReferencia(historial),
            convertirEstudios(historial.estudiosExter.estudios),
            historial.diagnostico.diagnostico
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Hoja Diaria Medicina');

    writeFile(workbook, `HOJA_DIARIA_MEDICO_${nombre}_${fechaActual}.xlsx`);
};

export default generarExcel;

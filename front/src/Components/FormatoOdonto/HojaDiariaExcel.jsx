import { writeFile, utils } from 'xlsx';

const convertirReferencia = (referencia) => {
    if (referencia.referencia.referencia) {
        return "Sí"
    } else {
        return "No"
    }
}

const convertirEstudios = (estudios) => {
    if (estudios.referencia.estudios) {
        return "Sí"
    } else {
        return "No"
    }
}

const generarExcel = (nombre, cedula, historialOdonto,diagnosticos, detallesPacientes, fechaActual) => {
    const datos = [
        ['Nombre del Odontólogo:', nombre],         
        ['Cédula Profesional:', cedula], 
        [],
        ['No.Expediente', 'Nombre', 'Sexo', 'Edad', 'Referencia', 'Estudios externos', 'Diagnóstico'],
        ...historialOdonto.map((historial, index) => [
            historial.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            convertirReferencia(historial),
            convertirEstudios(historial),
            diagnosticos[index]?.length > 0 ? diagnosticos[index][0].diagnostico : '-'
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Hoja Diaria Odontología');

    writeFile(workbook, `HOJA_DIARIA_ODONTOLOGIA_${nombre}_${fechaActual}.xlsx`);
};

export default generarExcel;

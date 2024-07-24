import { writeFile, utils } from 'xlsx';

const convertirReferencia = (referencia, lugarReferencia) => {
    if (referencia === "1") {
        return lugarReferencia;
    } else if (referencia === "2") {
        return "No";
    } else {
        return ""; // Manejar otros casos si es necesario
    }
}

const convertirVisita = (visita) => {
    switch (visita) {
        case "1":
            return "Primera vez";
        case "2":
            return "Subsecuente";
        default:
            return "";
    }
}

const generarExcel = (nombre, cedula, fichasMedicas, detallesPacientes, fechaActual) => {
    const datos = [
        ['Nombre del Médico:', nombre],         
        ['Cédula Profesional:', cedula], 
        [],
        ['No.Expediente', 'Nombre', 'Visita', 'Referencia', 'Sexo', 'Edad', 'Diagnóstico'],
        ...fichasMedicas.map((ficha, index) => [
            ficha.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            convertirVisita(ficha.extras.visita),
            convertirReferencia(ficha.extras.referencia, ficha.extras.lugar_referencia),
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            ficha.diagnostico
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Hoja Diaria Oftalmólogo');

    writeFile(workbook, `HOJA_DIARIA_OFTALMOLOGIA_${nombre}_${fechaActual}.xlsx`);
};

export default generarExcel;

import { writeFile, utils } from 'xlsx';

const convertirServicio = (numeroServicio) => {
    switch (numeroServicio) {
        case "1":
            return "Consulta general";
        case "2":
            return "Curación";
        case "3":
            return "Retiro de puntos";
        case "4":
            return "Aplicación de medicamentos";
        case "5":
            return "DxTx";
    }
}

const convertirPoblacion = (ficha) => {
    if (ficha.datosDemograficos.embarazada) {
        return "Embarazada"
    }
    else if (ficha.datosDemograficos.discapacitado) {
        return "Discapacitado"
    }
    else if (ficha.datosDemograficos.adulto_mayor) {
        return "Adulto mayor"
    }
    else {
        return "Ninguna"
    }
}

const generarExcel = (nombre, fichaTecnica, detallesPacientes, fechaActual) => {
    const datos = [
        ['Nombre del Médico:', nombre],         
        [],
        ['No.Expediente', 'Nombre', 'Edad', 'Servicio', 'Población', 'Nacionalidad'],
        ...fichaTecnica.map((ficha, index) => [
            ficha.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            convertirServicio(ficha.servicio_enfermeria),
            convertirPoblacion(ficha),
            detallesPacientes[index]?.datosPersonalesPacient.nacionalidad
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Hoja Diaria Enfermeria');

    writeFile(workbook, `HOJA_DIARIA_ENFERMERIA_${nombre}_${fechaActual}.xlsx`);
};

export default generarExcel;

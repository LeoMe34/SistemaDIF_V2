import { writeFile, utils } from 'xlsx';

const generarExcelFTO = (detallesPacientes, detalleFicha, detalleEnfermeria, detalleHistorial) => {
    const datos = [
        [],
        ['Fecha', 'No.Expediente', 'Nombre', 'Lugar de nacimiento', 'Fecha de nacimiento', 'Edad', 'Peso', 'Sexo',
            'Talla', 'Ocupación', 'Dirección', 'Telefono', 'Correo', 'Diagnóstico medico', 'Observaciones',
            'Motivo de la consulta', 'Empleado'],
        ...detalleFicha.map((fichas, index) => [
            fichas.fecha,
            detallesPacientes[index]?.no_expediente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.lugarNacimiento,
            detallesPacientes[index]?.datosPersonalesPacient.fechaDeNacimiento,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            detalleEnfermeria[index]?.datosFisicos.peso,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detalleEnfermeria[index]?.datosFisicos.talla,
            detallesPacientes[index]?.datosPersonalesPacient.ocupacion,
            detallesPacientes[index]?.datosDireccionPacient.direccion,
            detallesPacientes[index].datosContactoPacient.telefono,
            detallesPacientes[index].datosContactoPacient.correo,
            fichas.diagnostico,
            fichas.observacion,
            fichas.motivo_consulta,
            detalleHistorial[index]?.empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Fichas Tecnicas de Odontologia');

    writeFile(workbook, `FICHAS_TECNICAS_ODONTOLOGIA.xlsx`);
};

export default generarExcelFTO;
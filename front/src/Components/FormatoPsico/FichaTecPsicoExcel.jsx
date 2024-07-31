import { writeFile, utils } from 'xlsx';

const generarExcelFTP = (detallesPacientes, detalleFicha) => {
    const datos = [
        [],
        ['Fecha', 'No.Expediente', 'Nombre', 'Lugar de nacimiento', 'Fecha de nacimiento', 'Edad', 'Sexo',
            'Ocupación', 'Dirección', 'Telefono', 'Correo', 'Tipo de consulta', 'Tipo de visita',
            'Acompañante', 'Parentesco', 'Escolaridad', 'Motivo consulta', 'Impresion diagnostica',
            'Antecedentes', 'Tratamiento', 'Sugerencias', 'Valoracion', 'Empleado'],
        ...detalleFicha.map((fichas, index) => [
            fichas.fecha_visita,
            fichas.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.lugarNacimiento,
            detallesPacientes[index]?.datosPersonalesPacient.fechaDeNacimiento,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.ocupacion,
            detallesPacientes[index]?.datosDireccionPacient.direccion,
            detallesPacientes[index].datosContactoPacient.telefono,
            detallesPacientes[index].datosContactoPacient.correo,
            fichas.visita.tipo_consulta,
            fichas.visita.tipo_visita,
            fichas.visita.acompaniante,
            fichas.visita.parentesco,
            fichas.visita.escolaridad,
            fichas.visita.motivo_consulta,
            fichas.diagnostico.impresion_diagnostica,
            fichas.diagnostico.antecedentes,
            fichas.tratamiento.tratamiento,
            fichas.tratamiento.sugerencias,
            fichas.tratamiento.valoracion,
            fichas.empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Fichas Tecnicas de psicología');

    writeFile(workbook, `FICHAS_TECNICAS_PSICOLOGIA.xlsx`);
};

export default generarExcelFTP;

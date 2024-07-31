import { writeFile, utils } from 'xlsx';

const generarExcelNM = (detallesPacientes, detalleNota, detalleFicha) => {
    const datos = [
        [],
        ['Nombre', 'No.Expediente', 'Fecha', 'Hora', 'Edad','Sexo','Servicio', 
            'Diagnóstico medico', 'Tratamiento','Observaciones', 'Empleado'],
        ...detalleNota.map((notas, index) => [            
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.no_expediente,
            notas.fecha_consulta,
            notas.hora_consulta,            
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            notas.servicio,            
            notas.diagnostico,
            notas.tratamiento,
            notas.observaciones,
            detalleFicha[index].empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Notas Medicas de Medicina');

    writeFile(workbook, `NOTAS_MEDICAS.xlsx`);
};

export default generarExcelNM;

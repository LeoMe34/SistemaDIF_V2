import { writeFile, utils } from 'xlsx';

const generarExcelNE = (detallesPacientes, detalleNota,detalleHistorial) => {
    const datos = [
        [],
        ['Fecha', 'Nombre', 'No.Expediente', 'Notas', 'Diagnóstico', 'Tratamiento', 'Plan a seguir',
            'Resumen de consulta', 'Doctor'],
        ...detalleNota.map((notas, index) => [
            notas.fecha,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.no_expediente,            
            notas.notas,
            notas.diagnostico,
            notas.tratamiento,
            notas.plan,
            notas.resumen_consulta,
            detalleHistorial[index]?.empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Notas Medicas de Medicina');

    writeFile(workbook, `NOTAS_EVOLUCION.xlsx`);
};

export default generarExcelNE;

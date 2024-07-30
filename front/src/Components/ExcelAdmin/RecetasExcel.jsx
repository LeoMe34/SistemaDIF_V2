import { writeFile, utils } from 'xlsx';

const generarExcelRM = (detallesPacientes, detalleReceta, detalleFicha) => {
    const datos = [
        [],
        ['Fecha', 'Edad', 'Nombre', 'No.Expediente', 'Tratamiento','Medico'],
        ...detalleReceta.map((recetas, index) => [
            recetas.fecha,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.no_expediente,
            recetas?.medicamento?.tratamiento,
            detalleFicha[index].empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Recetas de Medicina');

    writeFile(workbook, `RECETAS_MEDICAS.xlsx`);
};

export default generarExcelRM;

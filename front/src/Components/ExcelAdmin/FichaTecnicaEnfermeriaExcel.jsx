import { writeFile, utils } from 'xlsx';

const convertirTrabajador = (trabajador) => {
    const opciones = {
        true: 'Sí',
        false: 'No'
    };
    return opciones[trabajador];
};

const generarExcelFTE = (fichas, detallesPacientes) => {
    const datos = [
        [],
        ['No.Expediente', 'Nombre', 'Fecha de nacimiento', 'Dirección', 'Sexo', 'Edad', 'Peso', 'Talla',
            'Ocupación', 'Telefono', 'Trabajador', 'Nacionalidad', 'Fecha', 'T/A', 'Frecuencia cardiaca',
            'Frecuencia respiratoria', 'Temperatura', 'Glicemia capilar', 'Enfermero'],
        ...fichas.map((ficha, index) => [
            ficha.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.fechaDeNacimiento,
            detallesPacientes[index].datosDireccionPacient?.direccion,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            ficha.datosFisicos?.peso,
            ficha.datosFisicos?.talla,
            detallesPacientes[index].datosPersonalesPacient?.ocupacion,
            detallesPacientes[index].datosContactoPacient?.telefono,
            convertirTrabajador(ficha.trabajador),
            detallesPacientes[index].datosPersonalesPacient?.nacionalidad,
            ficha.fecha,
            ficha.signosVitales.presion,
            ficha.signosVitales.frecuenciaC,
            ficha.signosVitales.frecuenciaR,
            ficha.signosVitales.temperatura,
            ficha.signosVitales.glicemia,
            ficha.empleado
        ])
    ];

    const worksheet = utils.aoa_to_sheet(datos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Fichas Tecnicas de Enfermeria');

    writeFile(workbook, `FICHAS_TECNICAS_ENFERMERIA.xlsx`);
};

export default generarExcelFTE;

import { writeFile, utils } from 'xlsx';

const convertirAntecedentes = (tieneRef) => {
    const opciones = {
        true: 'Sí',
        false: 'No'
    };
    return opciones[tieneRef];
};

const generarExcelHCO = (detallesPacientes, detalleHistorial, detalleEnfermeria) => {
    const datos = [
        [],
        ['Datos del paciente', 'Antecedentes patologicos', 'Antecedentes personales patologicos',
            'Antecedentes personales no patologicos', 'Antecedentes ginecobstetricos', 'Aparatos y sistemas', 'Signos vitales',
            'Exploracion fisica', 'Cabeza y cuello'],
        ['Fecha', 'No.Expediente', 'Nombre', 'Sexo', 'Edad', 'Estado civil', 'Domicilio',
            'Diabetes', 'Parentesco', 'Hipertension', 'Parentesco', 'Tuberculosis pulmonar', 'Parentesco', 'Cancer', 'Parentesco',
            'Cardiovasculares', 'Parentesco', 'Asma', 'Parentesco', 'Epilepsia', 'Parentesco',
            'Diabetes', 'Hipertension', 'Tuberculosis pulmonar', 'Cancer', 'Transfusiones', 'Quirurgicos',
            'Anestesicos', 'Alergicos', 'Traumaticos',
            'Vacunas', 'Alimentacion', 'Fauna nosiva', 'Vivienda', 'Adicciones',
            'Ultima regla', 'Ultimo doc', 'Planificacion familiar',
            'Respiratorio', 'Digestivo', 'Neurologico', 'Cardiovascular', 'Musculoesqueletico',
            'Peso', 'Talla', 'Frecuencia respiratoria', 'Frecuencia cardiaca', 'Presion arterial', 'Temperatura', 'Glicemia',
            'Padecimiento actual', 'Habitos exteriores', 'Labios', 'Mucosa oral', 'Encias', 'Lengua', 'Paladar duro', 'Paladar blando',
            'Cuello', 'Estudios de gabinetes', 'Medico'],
        ...detalleHistorial.map((fichas, index) => [
            fichas.fecha_elaboracion,
            fichas.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            detallesPacientes[index]?.datosPersonalesPacient.estadoCivil,
            `${detallesPacientes[index]?.datosDireccionPacient.direccion}, ${detallesPacientes[index]?.datosDireccionPacient.colonia}`,
            convertirAntecedentes(fichas.antHerediPato.diabetesH),
            fichas.antHerediPato.diabetes_parentesco,
            convertirAntecedentes(fichas.antHerediPato.hipertH),
            fichas.antHerediPato.hipert_parentesco,
            convertirAntecedentes(fichas.antHerediPato.tuberculoH),
            fichas.antHerediPato.tuberculo_parentesco,
            convertirAntecedentes(fichas.antHerediPato.cancerH),
            fichas.antHerediPato.cancer_parentesco,
            convertirAntecedentes(fichas.antHerediPato.cardioH),
            fichas.antHerediPato.cardio_parentesco,
            convertirAntecedentes(fichas.antHerediPato.asmaH),
            fichas.antHerediPato.asma_parentesco,
            convertirAntecedentes(fichas.antHerediPato.epilepsiaH),
            fichas.antHerediPato.epilepsia_parentesco,
            convertirAntecedentes(fichas.antPersonPato.diabetes),
            convertirAntecedentes(fichas.antPersonPato.hipert),
            convertirAntecedentes(fichas.antPersonPato.tuberculo),
            convertirAntecedentes(fichas.antPersonPato.cancer),
            convertirAntecedentes(fichas.antPersonPato.transfusion),
            convertirAntecedentes(fichas.antPersonPato.quirurgicos),
            convertirAntecedentes(fichas.antPersonPato.anestesicos),
            convertirAntecedentes(fichas.antPersonPato.alergicos),
            convertirAntecedentes(fichas.antPersonPato.trauma),
            fichas.personNoPato.vacuna,
            fichas.personNoPato.alimentacion,
            fichas.personNoPato.fauna_nociva,
            fichas.personNoPato.vivienda,
            fichas.personNoPato.adicciones,
            fichas.antGinecob.fecha_ultima_regla,
            fichas.antGinecob.fecha_ult_doc,
            fichas.antGinecob.planificacion_fam,
            fichas.aparatosSistemas.respiratorio,
            fichas.aparatosSistemas.digestivo,
            fichas.aparatosSistemas.neuro,
            fichas.aparatosSistemas.cardioV,
            fichas.aparatosSistemas.muscoes,
            detalleEnfermeria[index]?.datosFisicos?.peso,
            detalleEnfermeria[index]?.datosFisicos?.talla,
            detalleEnfermeria[index]?.signosVitales?.frecuenciaR,
            detalleEnfermeria[index]?.signosVitales?.frecuenciaC,
            detalleEnfermeria[index]?.signosVitales?.presion,
            detalleEnfermeria[index]?.signosVitales?.temperatura,
            detalleEnfermeria[index]?.signosVitales?.glicemia,
            fichas.padecimiento_actual,
            fichas.habitos_exteriores,
            fichas.cabeza.labios,
            fichas.cabeza.mucosa,
            fichas.cabeza.encias,
            fichas.cabeza.lengua,
            fichas.cabeza.paladar_duro,
            fichas.cabeza.paladar_blando,
            fichas.cuello_odont,
            fichas.referencia.estudios,
            fichas.empleado
        ]),
    ];

    const worksheet = utils.aoa_to_sheet(datos);

    // Definir los merges
    const merges = [
        { s: { r: 1, c: 9 }, e: { r: 1, c: 17 } }, // Antecedentes Hereditarios y Familiares
        { s: { r: 1, c: 18 }, e: { r: 1, c: 25 } }, // Antecedentes Personales no Patologicos
        { s: { r: 1, c: 26 }, e: { r: 1, c: 29 } }, // Antecedentes Personales Patologicos
        { s: { r: 1, c: 30 }, e: { r: 1, c: 44 } }, // Ginecobstetricos
        { s: { r: 1, c: 45 }, e: { r: 1, c: 48 } }, // METODO DE P.F.
        { s: { r: 1, c: 49 }, e: { r: 1, c: 52 } }, // Interrogatorio
        { s: { r: 1, c: 53 }, e: { r: 1, c: 67 } }, // Exploracion fisica
    ];

    worksheet['!merges'] = merges;

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Historiales Odontologicos');

    writeFile(workbook, `HISTORIAL_CLINICO_Odontologico.xlsx`);
};

export default generarExcelHCO;

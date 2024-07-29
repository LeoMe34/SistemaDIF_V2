import { writeFile, utils } from 'xlsx';

const convertirAntecedentes = (tieneRef) => {
    const opciones = {
        True: 'Sí',
        False: 'No'
    };
    return opciones[tieneRef];
};

const convertirTipoFam = (tipoFam) => {
    const opciones = {
        "0": 'Nuclear',
        "1": 'Extensa',
        "2": 'Compuesta'
    };
    return opciones[tipoFam];
};

const convertirRolMadre = (rolMadre) => {
    const opciones = {
        "0": 'No aplica',
        "1": 'E-M',
        "2": 'E-C',
        "3": 'E-SD'
    };
    return opciones[rolMadre];
};

const convertirFamilia = (familia) => {
    const opciones = {
        "d": 'D',
        "1": '1',
    };
    return opciones[familia];
};

const convertirDisfuncional = (disfuncional) => {
    const opciones = {
        "si": 'Sí',
        "no": 'No',
    };
    return opciones[disfuncional];
};

const generarExcelHCM = (detallesPacientes, detalleHistorial, detalleEnfermeria, detalleFicha) => {
    const datos = [
        [],
        ['', '', '', '', '', '', '', '', '', 'Antecedentes Hereditarios y Familiares', '', '', '', '', '', '', '', '',
            'Antecedentes Personales no Patologicos', '', '', '', '', '', '', '', 'Antecedentes Personales Patologicos', '', '', '',
            'Ginecobstetricos', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Metodo de planificacion familiar.', '', '', '',
            'Interrogatorio', '', '', '', 'Exploracion fisica'],
        ['Fecha', 'No.Consultorio', 'Nombre', 'No.Expediente', 'Informante', 'Tipo de familia', 'Rol de madre',
            'Familia', 'Disfuncionales familiares',
            'Diabetes', 'Parentesco', 'Hipertension', 'Parentesco', 'Cardiopatia isquemica', 'Parentesco', 'Cancer', 'Parentesco', 'Otros',
            'Estado civil', 'Escolaridad', 'Religion', 'Ocupacion', 'Alimentacion', 'Habitacion', 'Lugar y fecha de nacimiento', 'Higiene personal',
            'Medicos, quirurgicos, transfusiones', 'Tabaquismo, alcoholismo, alergicos', 'Tendencias a drogas, medicamentos', 'Otros',
            'Menarca', 'Inicio de vida sexual activa', 'Ultima menstruacion',
            'No.Embarazos', 'Partos', 'Abortos', 'Cesarea', 'Fecha de ultimo parto', 'No.Hijos', 'Macrosomicos vivos', 'Bajo peso al nacer',
            'No.Parejas', 'Heterosexuales', 'Homosexuales', 'Bisexuales', 'DIU', 'Hormonales', 'Quirurgicos', 'Otros',
            'Padecimiento actual', 'Aparatos y sistemas', 'Auxiliares de diagnostico previo', 'Manejo de tratamiento previos',
            'Estatura', 'Peso', 'IMC', 'Temperatura', 'Presion arterial', 'Frecuencia cardiaca', 'Frecuencia respiratoria',
            'Inspeccion general', 'Cabeza', 'Cuello', 'Torax', 'Abdomen', 'Columna vertical', 'Genitales externos',
            'Extremidades', 'Diagnostico', 'Tratamiento y manejo integral', 'Pronostico', 'Medico'
        ],
        ...detalleHistorial.map((fichas, index) => [
            fichas.fecha_elaboracion,
            fichas.referenciaMed?.num_consultorio,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            detallesPacientes[index]?.no_expediente,
            fichas.informante,
            convertirTipoFam(fichas.datosFamiliares?.tipo_familia),
            convertirRolMadre(fichas.datosFamiliares?.rol_madre),
            convertirFamilia(fichas.datosFamiliares?.familia),
            convertirDisfuncional(fichas.datosFamiliares?.disfuncional),
            convertirAntecedentes(fichas.antHerediPatM?.diabetes),
            fichas.antHerediPatM?.par_diabetes,
            convertirAntecedentes(fichas.antHerediPatM?.hipertension),
            fichas.antHerediPatM?.par_hipertension,
            convertirAntecedentes(fichas.antHerediPatM?.cardiopatia),
            fichas.antHerediPatM?.par_cardiopatia,
            convertirAntecedentes(fichas.antHerediPatM?.cancer),
            fichas.antHerediPatM?.par_cancer,
            fichas.antHerediPatM?.otros,
            detallesPacientes[index]?.datosPersonalesPacient?.estadoCivil,
            detalleEnfermeria[index]?.datosDemograficos?.escolaridad,
            detalleEnfermeria[index]?.datosDemograficos?.religion,
            detallesPacientes[index]?.datosPersonalesPacient?.ocupacion,
            fichas.antPersoNoPatM?.alimentacion,
            fichas.antPersoNoPatM?.habitacion,
            `${detallesPacientes[index]?.datosPersonalesPacient?.lugarNacimiento} ${detallesPacientes[index]?.datosPersonalesPacient?.fechaDeNacimiento}`,
            fichas.antPersoNoPatM?.higiene,
            fichas.antPersoPatM?.medicosQT,
            fichas.antPersoPatM?.tabaquismoAA,
            fichas.antPersoPatM?.tendenciaDM,
            fichas.antPersoPatM?.otros,

            fichas.ginecobMed?.menarca,
            fichas.ginecobMed?.vida_sexual,
            fichas.ginecobMed?.menstruacion,
            fichas.ginecobMed?.num_embarazos,
            fichas.ginecobMed?.partos,
            fichas.ginecobMed?.abortos,
            fichas.ginecobMed?.cesarea,
            fichas.ginecobMed?.ultimo_parto,
            fichas.ginecobMed?.num_hijos,
            fichas.ginecobMed?.macrosomicos,
            fichas.ginecobMed?.bajo_peso,
            fichas.ginecobMed?.num_parejas,
            fichas.ginecobMed?.heterosexuales,
            fichas.ginecobMed?.homosexuales,
            fichas.ginecobMed?.bisexuales,
            fichas.ginecobMed?.diu,
            fichas.ginecobMed?.hormonales,
            fichas.ginecobMed?.quirurgico,
            fichas.ginecobMed?.otros,

            fichas.interrogatorio?.padecimiento,
            fichas.interrogatorio?.aparatos_sistemas,
            fichas.interrogatorio?.auxiliares,
            fichas.interrogatorio?.tratamientos_previos,

            detalleEnfermeria[index]?.datosFisicos?.talla,
            detalleEnfermeria[index]?.datosFisicos?.peso,
            detalleEnfermeria[index]?.datosFisicos?.imc,
            detalleEnfermeria[index]?.signosVitales?.temperatura,
            detalleEnfermeria[index]?.signosVitales?.presion,
            detalleEnfermeria[index]?.signosVitales?.frecuenciaC,
            detalleEnfermeria[index]?.signosVitales?.frecuenciaR,

            fichas.exploracionFisica?.inspeccion_gral,
            fichas.exploracionFisica?.cabeza,
            fichas.exploracionFisica?.cuello,
            fichas.exploracionFisica?.torax,
            fichas.exploracionFisica?.abdomen,
            fichas.exploracionFisica?.columna_vertical,
            fichas.exploracionFisica?.genitales_externos,
            fichas.exploracionFisica?.extremidades,

            fichas.diagnostico?.diagnostico,
            fichas.diagnostico?.tratamiento_integral,
            fichas.diagnostico?.pronostico,
            detalleFicha[index]?.empleado,
        ]),
    ];

    const worksheet = utils.aoa_to_sheet(datos);

    // Definir los merges
    const merges = [
        { s: { r: 1, c: 9 }, e: { r: 1, c: 17 } }, // Antecedentes Hereditarios y Familiares
        { s: { r: 1, c: 18 }, e: { r: 1, c: 25 } }, // Antecedentes Personales no Patologicos
        { s: { r: 1, c: 26 }, e: { r: 1, c: 29 } }, // Antecedentes Personales Patologicos
        { s: { r: 1, c: 30 }, e: { r: 1, c: 44} }, // Ginecobstetricos
        { s: { r: 1, c: 45 }, e: { r: 1, c: 48 } }, // METODO DE P.F.
        { s: { r: 1, c: 49 }, e: { r: 1, c: 52 } }, // Interrogatorio
        { s: { r: 1, c: 53 }, e: { r: 1, c: 67 } }, // Exploracion fisica
    ];

    worksheet['!merges'] = merges;

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Historiales Clinicos');

    writeFile(workbook, `HISTORIAL_CLINICO_MEDICO.xlsx`);
};

export default generarExcelHCM;

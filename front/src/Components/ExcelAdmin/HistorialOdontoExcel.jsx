import { writeFile, utils } from 'xlsx';

const convertirAntecedentes = (tieneRef) => {
    const opciones = {
        true: 'Sí',
        false: 'No'
    };
    return opciones[tieneRef];
};

const generarExcelHCM = (detallesPacientes, detalleHistorial, detalleEnfermeria, detalleFicha) => {
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
            'PESO', 'TALLA', 'FRECUENCIA RESPIRATORIA', 'FRECUENCIA CARDIACA', 'PRESIÓN ARTERIAL', 'TEMPERATURA', 'GLICEMIA',
            'Padecimiento actual', 'Habitos exteriores', 'Labios', 'Mucosa oral', 'Encias', 'Lengua', 'Paladar duro', 'Paladar blando',
            'Cuello', 'Estudios de gabinetes', 'Medico'],
        ...detalleHistorial.map((fichas, index) => [
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
    utils.book_append_sheet(workbook, worksheet, 'Historiales Clinicos');

    writeFile(workbook, `HISTORIAL_CLINICO_MEDICO.xlsx`);
};

export default generarExcelHCM;

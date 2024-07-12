import jsPDF from 'jspdf';
import { ubuntuBold, ubuntuRegular } from './../../Fuentes/Base64'; // Ajusta el path según sea necesario
import 'jspdf-autotable';

const logoDif = "../Logos/LOGO DIF.jpeg"
const logoAyuntamiento = "../Logos/LOGO-AYUNTAMIENTO2.png"

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

const generarPDF = (detallePaciente, noExpediente, datos, datos2, data, empleado, detalleEnfermeria) => {
    const documento = new jsPDF();
    documento.addFileToVFS('Ubuntu-Bold.ttf', ubuntuBold);
    documento.addFont('Ubuntu-Bold.ttf', 'Ubuntu-Bold', 'normal');
    documento.addFileToVFS('Ubuntu-Regular.ttf', ubuntuRegular);
    documento.addFont('Ubuntu-Regular.ttf', 'Ubuntu-Regular', 'normal');

    const pageHeight = documento.internal.pageSize.getHeight();

    const addTextWithWrap = (text, x, y, maxWidth) => {
        const lines = documento.splitTextToSize(text, maxWidth);
        documento.text(lines, x, y);
        return lines.length * 10; // Devuelve el aumento en Y basado en la altura de línea
    };

    const checkAddPage = (currentY, heightToAdd) => {
        if (currentY + heightToAdd > pageHeight - 20) { // 20 para margen inferior
            documento.addPage();
            return 20; // posición y para la nueva página
        }
        return currentY;
    };

    const datosFisicos = [
        ['ESTATURA', 'PESO', 'IMC', 'TEMPERATURA', 'PRESIÓN ARTERIAL', 'FRECUENCIA CARDIACA', 'FRECUENCIA RESPIRATORIA'],
        [
            `${detalleEnfermeria.datosFisicos.talla}`,
            `${detalleEnfermeria.datosFisicos.peso}`,
            `${detalleEnfermeria.datosFisicos.imc}`,
            `${detalleEnfermeria.signosVitales.temperatura}`,
            `${detalleEnfermeria.signosVitales.presion}`,
            `${detalleEnfermeria.signosVitales.frecuenciaC}`,
            `${detalleEnfermeria.signosVitales.frecuenciaR}`
        ]
    ];

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(18);
    documento.text('HISTORIA CLINICA SIMPLIFICADA \t', 45, 30);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    documento.addImage(logoDif, 'jpeg', 10, 10, 20, 20)
    documento.addImage(logoAyuntamiento, 'png', 180, 10, 23, 20)

    let yPosition = 50;
    const maxWidth = 180;

    yPosition += addTextWithWrap(`NOMBRE DEL PACIENTE: ${detallePaciente?.datosPersonalesPacient?.nombre} ${detallePaciente?.datosPersonalesPacient?.apellidoP} ${detallePaciente?.datosPersonalesPacient?.apellidoM}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`NÚMERO DE EXPEDIENTE: ${noExpediente}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`N° CONSULLTORIO: ${datos.no_consultorio}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`INFORMANTE: ${datos.informante}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    yPosition += addTextWithWrap(`TIPO DE FAMILIA: ${convertirTipoFam(datos.tipo_familia)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`ROL DE MADRE: ${convertirRolMadre(datos.rol_madre)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`FAMILIAR RESPONSABLE DEL PACIENTE`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`FAMILIA: ${convertirFamilia(datos.familia)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`DISFUNCIONALES FAMILIARES: ${convertirDisfuncional(datos.disfuncional)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(16);
    yPosition += addTextWithWrap('HEREDITARIOS Y FAMILIARES', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition += addTextWithWrap(`DIABETES MELITUS: ${convertirAntecedentes(datos2.diabetes)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(datos2.diabetes) == 'Sí') {
        yPosition += addTextWithWrap(`PARENTESCO: ${datos2.par_diabetes}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition += addTextWithWrap(`HIPERTENSIÓN ARTERIAL: ${convertirAntecedentes(datos2.hipertension)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(datos2.hipertension) == 'Sí') {
        yPosition += addTextWithWrap(`PARENTESCO: ${datos2.par_hipertension}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition += addTextWithWrap(`CARDIOPATIA ISQUEMICA: ${convertirAntecedentes(datos2.cardiopatia)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(datos2.cardiopatia) == 'Sí') {
        yPosition += addTextWithWrap(`PARENTESCO: ${datos2.par_cardiopatia}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition += addTextWithWrap(`CANCER: ${convertirAntecedentes(datos2.cancer)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(datos2.cancer) == 'Sí') {
        yPosition += addTextWithWrap(`PARENTESCO: ${datos2.par_cancer}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    if (datos2.otros_ant_par !== '') {
        yPosition += addTextWithWrap(`OTROS: ${datos2.otros_ant_par}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }


    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(16);
    yPosition += addTextWithWrap('PERSONALES NO PATÓLOGICOS\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition += addTextWithWrap(`ESTADO CIVIL: ${detallePaciente.datosPersonalesPacient.estadoCivil}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`RELIGIÓN: ${detalleEnfermeria.datosDemograficos.religion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`ALIMENTACIÓN: ${datos2.alimentacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`LUGAR Y FECHA DE NACIMIENTO: !, ${detallePaciente.datosPersonalesPacient.fechaDeNacimiento}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`ESCOLARIDAD: ${detalleEnfermeria.datosDemograficos.escolaridad}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`OCUPACIÓN: ${detallePaciente.datosPersonalesPacient.ocupacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`HABITACIÓN: ${datos2.habitacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`HIGIENE PERSONAL: ${datos2.higiene}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(16);
    yPosition += addTextWithWrap('PERSONALES PATÓLOGICOS\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition += addTextWithWrap(`MEDICOS, QUIRURGICOS, TRANSFUCIONES: ${datos2.medicosQT}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`TABAQUISMO, ALCOHOLISMO, ALERGICOS: ${datos2.tabaquismoAA}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`TENDENCIAS A DROGAS, MEDICAMENTOS: ${datos2.tendenciaDM}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (datos2.otros_antPat !== '') {
        yPosition += addTextWithWrap(`OTROS: ${datos2.otros_antPat}`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }


    if (detallePaciente.sexo === "Femenino") {
        documento.setFont('Ubuntu-Bold');
        documento.setFontSize(16);
        yPosition += addTextWithWrap('GINECOBSTETRICOS\t', 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        documento.setFont('Ubuntu-Regular');
        documento.setFontSize(12);

        yPosition += addTextWithWrap(`MENARCA ${datos2.menarca} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        yPosition += addTextWithWrap(`INICIO DE VIDA SEXUAL ACTIVA ${datos2.vida_sexual} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        yPosition += addTextWithWrap(`ULTIMA MENSTRUACIÓN ${datos2.menstruacion} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        if (datos2.vida_sexual !== null && !isNaN(vidaSexual) && vidaSexual.trim() !== '' && vidaSexual !== '0') {
            yPosition += addTextWithWrap(`N° EMBARAZOS: ${datos2.num_embarazos}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`PARTOS: ${datos2.partos}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`ABORTOS: ${datos2.abortos}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`CESAREAS: ${datos2.cesarea}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`FECHA DE ULTIMO PARTO: ${datos2.ultimo_parto}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`N° HIJOS: ${datos2.num_hijos}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`MACROSOMICOS VIVOS: ${datos2.macrosomicos}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`BAJO PESO AL NACER: ${datos2.bajo_peso}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`N° DE PAREJAS: ${datos2.num_parejas}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`HETEROSEXUALES: ${datos2.heterosexuales}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`HOMOSEXUALES: ${datos2.homosexuales}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`BISEXUALES: ${datos2.bisexuales}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`METODO DE P.F.`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`DIU: ${datos2.diu}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`HORMONALES: ${datos2.hormonales}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            yPosition += addTextWithWrap(`QUIRURGICOS: ${datos2.quirurgico}`, 20, yPosition, maxWidth);
            yPosition = checkAddPage(yPosition, 10);
            if (datos2.otrosMP !== '') {
                yPosition += addTextWithWrap(`OTROS: ${datos2.otrosMP}`, 20, yPosition, maxWidth);
                yPosition = checkAddPage(yPosition, 10);
            }
        }
    }

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(16);
    yPosition += addTextWithWrap('INTERROGATORIO\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition += addTextWithWrap(`PADECIMIENTO ACTUAL: ${data.padecimiento}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`APARATOS Y SISTEMAS: ${data.aparatos_sistemas}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`AUXILIARES DE DIAGNOSTICO PREVIO: ${data.auxiliares}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`MANEJO DE TRATAMIENTO PREVIOS: ${data.tratamientos_previos}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(16);
    yPosition += addTextWithWrap('EXPLORACIÓN FÍSICA\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    documento.autoTable({
        startY: yPosition,
        head: [datosFisicos[0]],
        body: [datosFisicos[1]],
        theme: 'plain',
        styles: { halign: 'center' },
        headStyles: { fillColor: '#8B2571', textColor: '#FFFFFF' }, // Color de fondo y color de la letra del encabezado
        margin: { top: 10, bottom: 10, left: 20, right: 10 }, // Margen izquierdo para ajustar la posición X
    });

    yPosition = documento.previousAutoTable.finalY + 10;
    yPosition = checkAddPage(yPosition, 10);

    yPosition += addTextWithWrap(`INSPECCION GENERAL: ${data.inspeccion_gral}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`CABEZA: ${data.cabeza}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`CUELLO: ${data.cuello}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`TORAX: ${data.torax}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`ABDOMEN: ${data.abdomen}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`COLUMNA VERTICAL: ${data.columna_vertical}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`GENITALES EXTERNOS: ${data.genitales_externos}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`EXTREMIDADES: ${data.extremidades}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    yPosition += addTextWithWrap(`DIAGNOSTICO: ${data.diagnostico}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`TRATAMIENTO Y MANEJO INTEGRAL: ${data.tratamiento_integral}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`PRONOSTICO: ${data.pronostico}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    const getCenteredXPosition = (text, maxWidth) => {
        const textWidth = documento.getTextWidth(text);
        return (maxWidth - textWidth) / 2;
    };

    yPosition += addTextWithWrap(`FECHA DE ELABORACION: ${datos.fecha}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(` ${empleado.nombre_empleado}`, getCenteredXPosition(empleado.nombre_empleado, maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`${empleado.cedula}`, getCenteredXPosition(empleado.cedula, maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition += addTextWithWrap(`MEDICO RESPONSABLE`, getCenteredXPosition("MEDICO RESPONSABLE", maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);


    documento.setTextColor(139, 37, 113);
    documento.setFontSize(10);
    yPosition = checkAddPage(yPosition, 10);
    documento.text('Veracruz esq. Rubí s/n Col.Tierra y Libertad Coatzacoalcos, Ver. C.P.96588 Tel.2139175', 35, yPosition);

    yPosition = checkAddPage(yPosition, 10);
    const rectHeight = 3;
    const spacing = 3; // Espacio entre los rectángulos
    const colors = ['#3EBAB0', '#EC9723', '#EE759E', '#8B2571']; // Colores en formato hexadecimal
    const rectWidths = [20, 20, 20, 90];
    let xPosition = 25; // Posición inicial x

    rectWidths.forEach((width, index) => {
        documento.setFillColor(colors[index]);
        documento.rect(xPosition, yPosition, width, rectHeight, 'F');
        xPosition += width + spacing; // Actualizar la posición x para el siguiente rectángulo
    });

    documento.save(`HISTORIAL_CLINICO_${noExpediente}.pdf`);
};

export default generarPDF;

import jsPDF from 'jspdf';
import { ubuntuBold, ubuntuRegular } from './../../Fuentes/Base64'; // Ajusta el path según sea necesario
import 'jspdf-autotable';

const logoDif = "../Logos/LOGO DIF.jpeg"
const logoAyuntamiento = "../Logos/LOGO-AYUNTAMIENTO2.png"

const convertirAntecedentes = (tieneRef) => {
    const opciones = {
        true: 'Sí',
        false: 'No'
    };
    return opciones[tieneRef];
};

const generarPDF = (detallePaciente, noExpediente, historialO, antecedentes, data, empleado, detalleEnfermeria, fechaActual) => {
    const documento = new jsPDF();
    documento.addFileToVFS('Ubuntu-Bold.ttf', ubuntuBold);
    documento.addFont('Ubuntu-Bold.ttf', 'Ubuntu-Bold', 'normal');
    documento.addFileToVFS('Ubuntu-Regular.ttf', ubuntuRegular);
    documento.addFont('Ubuntu-Regular.ttf', 'Ubuntu-Regular', 'normal');

    const pageHeight = documento.internal.pageSize.getHeight();
    const pageWidth = documento.internal.pageSize.width;

    const addTextWithWrap = (text, x, y, maxWidth) => {
        const lines = documento.splitTextToSize(text, maxWidth);
        documento.text(lines, x, y);
        const lineHeight = documento.getLineHeight() / documento.internal.scaleFactor; // Altura de línea
        return (y + lines.length * lineHeight) + 5; // Devuelve el aumento en Y basado en la altura de línea
    };

    const drawFooter = (yPosition) => {
        const rectHeight = 3;
        const spacing = 3; // Espacio entre los rectángulos
        const colors = ['#3EBAB0', '#EC9723', '#EE759E', '#8B2571']; // Colores en formato hexadecimal
        const rectWidths = [20, 20, 20, 90];
        let xPosition = 25; // Posición inicial x

        documento.setTextColor(139, 37, 113);
        documento.setFontSize(10);
        documento.text('Veracruz esq. Rubí s/n Col.Tierra y Libertad Coatzacoalcos, Ver. C.P.96588 Tel.2139175', 35, yPosition - 5);

        rectWidths.forEach((width, index) => {
            documento.setFillColor(colors[index]);
            documento.rect(xPosition, yPosition, width, rectHeight, 'F');
            xPosition += width + spacing; // Actualizar la posición x para el siguiente rectángulo            
        });

        documento.setTextColor(0, 0, 0);
        documento.setFontSize(12);
    };

    const checkAddPage = (currentY, heightToAdd) => {
        if (currentY + heightToAdd > pageHeight - 20) { // 20 para margen inferior
            drawFooter(pageHeight - 20); // Dibujar los rectángulos en la parte inferior antes de agregar una nueva página
            documento.addPage();
            return 20; // posición y para la nueva página
        }
        return currentY;
    };

    const datosFisicos = [
        ['PESO', 'TALLA', 'FRECUENCIA RESPIRATORIA', 'FRECUENCIA CARDIACA', 'PRESIÓN ARTERIAL', 'TEMPERATURA', 'GLICEMIA'],
        [
            `${detalleEnfermeria.datosFisicos.peso}`,
            `${detalleEnfermeria.datosFisicos.talla}`,
            `${detalleEnfermeria.signosVitales.frecuenciaR}`,
            `${detalleEnfermeria.signosVitales.frecuenciaC}`,
            `${detalleEnfermeria.signosVitales.presion}`,
            `${detalleEnfermeria.signosVitales.temperatura}`,
            `${detalleEnfermeria.signosVitales.glicemia}`
        ]
    ];

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(18);
    documento.text('HISTORIA CLINICO DENTAL \t', 45, 30);

    documento.addImage(logoDif, 'jpeg', 10, 10, 20, 20)
    documento.addImage(logoAyuntamiento, 'png', 180, 10, 23, 20)

    const mitadPagina = pageWidth / 2
    const tercioPagina = pageWidth / 3
    let yPosition = 40;
    const maxWidth = 180;

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap("DATOS DEL PACIENTE", 20, yPosition, maxWidth)
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition = addTextWithWrap(`FECHA DE ELABORACION: ${fechaActual}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`NÚMERO DE EXPEDIENTE: ${noExpediente}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    yPosition = addTextWithWrap(`NOMBRE DEL PACIENTE: ${detallePaciente?.datosPersonalesPacient?.nombre} ${detallePaciente?.datosPersonalesPacient?.apellidoP} ${detallePaciente?.datosPersonalesPacient?.apellidoM}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`SEXO: ${detallePaciente?.datosPersonalesPacient?.sexo}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`EDAD: ${detallePaciente?.datosPersonalesPacient?.edad}`, tercioPagina, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ESTADO CIVIL ${detallePaciente?.datosPersonalesPacient?.estadoCivil}`, tercioPagina * 2, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`DOMICILIO: ${detallePaciente?.datosDireccionPacient?.direccion}, Col.${detallePaciente?.datosDireccionPacient?.colonia}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('ANTECEDENTES PATOLÓGICOS', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition = addTextWithWrap(`DIABETES: ${convertirAntecedentes(antecedentes.diabetesH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.diabetesH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.diabetesParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`HIPERTENSIÓN: ${convertirAntecedentes(antecedentes.hipertH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.hipertH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.hipertParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`TUBERCULOSIS PULMONAR: ${convertirAntecedentes(antecedentes.tuberculoH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.tuberculoH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.tuberculoParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`CANCER: ${convertirAntecedentes(antecedentes.cancerH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.cancerH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.cancerParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`CARDIOVASCULARES: ${convertirAntecedentes(antecedentes.cardioH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.cardioH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.cardioParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`ASMA: ${convertirAntecedentes(antecedentes.asmaH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.asmaH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.asmaParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }
    yPosition = addTextWithWrap(`EPILEPSIAS: ${convertirAntecedentes(antecedentes.epilepsiaH)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    if (convertirAntecedentes(antecedentes.epilepsiaH) == 'Sí') {
        addTextWithWrap(`PARENTESCO: ${antecedentes.epilepsiaParentesco}`, mitadPagina, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('ANTECEDENTES PERSONALES PATÓLOGICOS\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    addTextWithWrap(`DIABETES: ${convertirAntecedentes(antecedentes.diabetes)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`HIPERTENSIÓN: ${convertirAntecedentes(antecedentes.hipert)}`, tercioPagina, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`TUBERCULOSIS PULMONAR: ${convertirAntecedentes(antecedentes.tuberculo)}`, tercioPagina * 2, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`CANCER: ${convertirAntecedentes(antecedentes.cancer)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`TRANSFUSIONES: ${convertirAntecedentes(antecedentes.transfusion)}`, tercioPagina, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`QUIRÚRGICOS: ${convertirAntecedentes(antecedentes.quirurgicos)}`, tercioPagina * 2, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`ANESTÉSICOS: ${convertirAntecedentes(antecedentes.anestesicos)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    addTextWithWrap(`ALÉRGICOS: ${convertirAntecedentes(antecedentes.alergicos)}`, tercioPagina, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`TRAUMÁTICOS: ${convertirAntecedentes(antecedentes.trauma)}`, tercioPagina * 2, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('ANTECEDENTES PERSONALES NO PATÓLOGICOS\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition = addTextWithWrap(`VACUNAS: ${antecedentes.vacuna}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ALIMENTACIÓN: ${antecedentes.alimentacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`FAUNA NOSIVA, ${antecedentes.fauna_nociva}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`VIVIENDA: ${antecedentes.vivienda}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ADICCIONES: ${antecedentes.adicciones}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    /*yPosition = addTextWithWrap(`PROFESIÓN OFICIO: ${antecedentes.habitacion}`, mitadPagina, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);*/


    if (detallePaciente.datosPersonalesPacient.sexo === "Femenino") {
        documento.setFont('Ubuntu-Bold');
        documento.setFontSize(14);
        yPosition = addTextWithWrap('ANTECEDENTES GINECO-OBSTÉTRICOS\t', 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        documento.setFont('Ubuntu-Regular');
        documento.setFontSize(12);

        yPosition = addTextWithWrap(`FECHA DE ULTIMA REGLA ${antecedentes.fecha_ultima_regla} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        yPosition = addTextWithWrap(`FECHA DE ULTIMO DOC ${antecedentes.fecha_ult_doc} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
        yPosition = addTextWithWrap(`PLANIFICACIÓN FAMILIAR ${antecedentes.planificacion_fam} AÑOS`, 20, yPosition, maxWidth);
        yPosition = checkAddPage(yPosition, 10);
    }

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('INTERROGATORIO POR APARATOS Y SISTEMAS\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition = addTextWithWrap(`RESPIRATORIO: ${data.respiratorio}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`DIGESTIVO: ${data.digestivo}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`NEUROLÓGICO: ${data.neuro}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`CARDIOVASCULARES: ${data.cardioV}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`MUSCULOESQUELÉTICO: ${data.muscoes}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('SIGNOS VITALES\t', 20, yPosition, maxWidth);
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

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('PADECIMIENTO ACTUAL\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${historialO.padecimiento}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('EXPLORACIÓN FÍSICA\t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`HABITOS EXTERIORES: ${data.habitos_ext}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('CABEZA Y CUELLO \t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    yPosition = addTextWithWrap(`LABIOS: ${data.labios}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`MUCOSA ORAL: ${data.mucosa}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ENCIAS: ${data.encias}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`LENGUA: ${data.lengua}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`PALADAR DURO: ${data.paladar_duro}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`PALADAR BLANDO: ${data.paladar_blando}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`CUELLO: ${data.cuello}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap('ESTUDIOS DE LABORATORIO GABINETE \t', 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${convertirAntecedentes(historialO.estudios)}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    const getCenteredXPosition = (text, maxWidth) => {
        const textWidth = documento.getTextWidth(text);
        return (maxWidth - textWidth) / 2;
    };

    const requiredSpaceForFooter = 10; // Espacio requerido para el nombre, cédula y título del médico
    if (yPosition + requiredSpaceForFooter > pageHeight - 10) {
        drawFooter(pageHeight - 20); // Dibujar el pie de página actual
        documento.addPage();
        yPosition = 20; // Nueva posición Y en la nueva página
    }

    yPosition = pageHeight - 50;
    yPosition = addTextWithWrap(` ${empleado.nombre_empleado}`, getCenteredXPosition(empleado.nombre_empleado, maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`${empleado.cedula}`, getCenteredXPosition(empleado.cedula, maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`MEDICO RESPONSABLE`, getCenteredXPosition("MEDICO RESPONSABLE", maxWidth) + 20, yPosition, maxWidth);

    drawFooter(pageHeight - 20);

    documento.save(`HISTORIAL_CLINICO_${noExpediente}.pdf`);
};

export default generarPDF;

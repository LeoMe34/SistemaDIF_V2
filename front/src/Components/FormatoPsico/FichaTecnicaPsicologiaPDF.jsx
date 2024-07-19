import jsPDF from 'jspdf';
import { ubuntuBold, ubuntuRegular } from '../../Fuentes/Base64';

const logoDif = "../Logos/LOGO DIF.jpeg"
const logoAyuntamiento = "../Logos/LOGO-AYUNTAMIENTO2.png"

const generarPDF = (detallePaciente, noExpediente, data, empleado, fechaActual) => {
    const documento = new jsPDF();
    documento.addFileToVFS('Ubuntu-Bold.ttf', ubuntuBold);
    documento.addFont('Ubuntu-Bold.ttf', 'Ubuntu-Bold', 'normal');
    documento.addFileToVFS('Ubuntu-Regular.ttf', ubuntuRegular);
    documento.addFont('Ubuntu-Regular.ttf', 'Ubuntu-Regular', 'normal');

    const pageHeight = documento.internal.pageSize.getHeight();

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

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(18);
    documento.text('FICHA TÉCNICA DE PSICOLOGIA \t', 45, 30);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    documento.addImage(logoDif, 'jpeg', 10, 10, 20, 20)
    documento.addImage(logoAyuntamiento, 'png', 180, 10, 23, 20)

    let yPosition = 40;
    const maxWidth = 180;

    yPosition = addTextWithWrap(`FECHA: ${fechaActual}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`NÚMERO DE EXPEDIENTE: ${noExpediente}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`NOMBRE DEL PACIENTE: ${detallePaciente?.datosPersonalesPacient?.nombre} ${detallePaciente?.datosPersonalesPacient?.apellidoP} ${detallePaciente?.datosPersonalesPacient?.apellidoM}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`EDAD: ${detallePaciente?.datosPersonalesPacient?.edad}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`FECHA DE NACIMIENTO: ${detallePaciente?.datosPersonalesPacient?.fechaDeNacimiento}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`DIRECCIÓN: ${detallePaciente?.datosDireccionPacient?.direccion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`OCUPACIÓN: ${detallePaciente?.datosPersonalesPacient?.ocupacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ESCOLARIDAD: ${detallePaciente?.datosPersonalesPacient?.ocupacion}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`NÚMERO DE TELEFONO: ${detallePaciente?.datosContactoPacient?.telefono}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`ACOMPAÑA: ${data.acompania}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap(`MOTIVO DE LA CONSULTA`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${data.motivo_consulta}`, 20, yPosition - 5, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap(`ANTECEDENTES`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${data.antecedentes}`, 20, yPosition - 5, maxWidth);
    yPosition = checkAddPage(yPosition, 10);


    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap(`IMPRESIÓN DIAGNÓSTICA`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${data.impresion_diagnostica}`, 20, yPosition - 5, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap(`TRATAMIENTO`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${data.tratamiento}`, 20, yPosition - 5, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(14);
    yPosition = addTextWithWrap(`SUGERENCIAS Y RECOMENDACIONES`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);
    yPosition = addTextWithWrap(`${data.sugerencias}`, 20, yPosition - 5, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    const getCenteredXPosition = (text, maxWidth) => {
        const textWidth = documento.getTextWidth(text);
        return (maxWidth - textWidth) / 2;
    };

    const requiredSpaceForFooter = 50; // Espacio requerido para el nombre, cédula y título del médico
    if (yPosition + requiredSpaceForFooter > pageHeight - 10) {
        drawFooter(pageHeight - 20); // Dibujar el pie de página actual
        documento.addPage();
        yPosition = 20; // Nueva posición Y en la nueva página
    }

    yPosition = pageHeight - 50;
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(10);
    yPosition = addTextWithWrap(` ${empleado.nombre_empleado}`, getCenteredXPosition(empleado.nombre_empleado, maxWidth) + 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`${empleado.cedula}`, getCenteredXPosition(empleado.cedula, maxWidth) + 20, yPosition - 3, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`PSICOLOGO(A)`, getCenteredXPosition("PSICOLOGO(A)", maxWidth) + 20, yPosition - 3, maxWidth);
    yPosition = addTextWithWrap(`ASISTENCIA E INTEGRACIÓN SOCIAL DIF MUNICIPAL COATZACOALCOS`, getCenteredXPosition("ASISTENCIA E INTEGRACIÓN SOCIAL DIF MUNICIPAL COATZACOALCOS", maxWidth) + 20, yPosition - 3, maxWidth);

    drawFooter(pageHeight - 20);

    documento.save(`Ficha_Tecnica_Psicologia_${noExpediente}.pdf`);
};

export default generarPDF;

import jsPDF from 'jspdf';
import { ubuntuBold, ubuntuRegular } from './../../Fuentes/Base64'; // Ajusta el path según sea necesario
import 'jspdf-autotable';

const logoDif = "../Logos/LOGO DIF.jpeg"
const logoAyuntamiento = "../Logos/LOGO-AYUNTAMIENTO2.png"

const convertirReferencia = (referencia, lugarReferencia) => {
    if (referencia === "1") {
        return lugarReferencia;
    } else if (referencia === "2") {
        return "No";
    } else {
        return ""; // Manejar otros casos si es necesario
    }
}


const convertirVisita = (visita) => {
    switch (visita) {
        case "1":
            return "Primera vez"
        case "2":
            return "Subsecuente"
    }
}

const generarPDF = (nombre, cedula, fichasMedicas, detallesPacientes, fechaActual) => {
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

    const getCenteredXPosition = (text, maxWidth) => {
        const textWidth = documento.getTextWidth(text);
        return (maxWidth - textWidth) / 2;
    };

    const datos = [
        ['No.Expediente', 'Nombre', 'Visita', 'Referencia', 'Sexo', 'Edad', 'Diagnóstico'],
        ...fichasMedicas.map((ficha, index) => [
            ficha.paciente,
            `${detallesPacientes[index]?.datosPersonalesPacient.nombre} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoP} ${detallesPacientes[index]?.datosPersonalesPacient.apellidoM}`,
            convertirVisita(ficha.extras.visita),
            convertirReferencia(ficha.extras.referencia, ficha.extras.lugar_referencia),
            detallesPacientes[index]?.datosPersonalesPacient.sexo,
            detallesPacientes[index]?.datosPersonalesPacient.edad,
            ficha.diagnostico
        ])
    ];
    
    const maxWidth = 180;

    documento.setFont('Ubuntu-Bold');
    documento.setFontSize(18);
    documento.text('HOJA DIARIA AUDIOLOGIA', getCenteredXPosition('HOJA DIARIA AUDIOLOGIA', maxWidth) + 20, 30);
    documento.setFont('Ubuntu-Regular');
    documento.setFontSize(12);

    documento.addImage(logoDif, 'jpeg', 10, 10, 20, 20)
    documento.addImage(logoAyuntamiento, 'png', 180, 10, 23, 20)

    let yPosition = 40;

    yPosition = addTextWithWrap(`FECHA DE ELABORACION: ${fechaActual}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`MEDICO RESPONSABLE: ${nombre}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);
    yPosition = addTextWithWrap(`CEDULA: ${cedula}`, 20, yPosition, maxWidth);
    yPosition = checkAddPage(yPosition, 10);

    documento.autoTable({
        startY: yPosition,
        head: [datos[0]],
        body: datos.slice(1),
        theme: 'plain',
        styles: { halign: 'center' },
        headStyles: { fillColor: '#8B2571', textColor: '#FFFFFF' }, // Color de fondo y color de la letra del encabezado
        margin: { top: 10, bottom: 10, left: 20, right: 10 }, // Margen izquierdo para ajustar la posición X
    });

    drawFooter(pageHeight - 20);

    documento.save(`HOJA_DIARIA_AUDIOLOGIA_${nombre}_${fechaActual}.pdf`);
};

export default generarPDF;

import { Document, Page } from 'react-pdf';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PDFViewer({ detalles, token }) {
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        const getPdfData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000${detalles.archivo}`, {
                    responseType: 'arraybuffer',
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                setPdfData(blob);
            } catch (error) {
                console.error('Error al obtener el PDF', error);
            }
        };
        getPdfData();
    }, [detalles, token]);

    return (
        <div>
            {pdfData && (
                <iframe
                    src={URL.createObjectURL(pdfData)}
                    width="100%"
                    height="600px"
                    title="Documento PDF"
                    frameBorder="0"
                    allowFullScreen
                />
            )}
        </div>
    );
}

export default PDFViewer;


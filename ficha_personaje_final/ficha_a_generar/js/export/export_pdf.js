window.ExportPDF = {
    download: function (data) {
        const { jsPDF } = window.jspdf;
        const input = document.getElementById('fichaPreview');

        // Check if we are in mobile view or editor view
        // If the preview is hidden, we might need to temporarily show it or clone it off-screen
        // But since we have a "View Mode", let's assume the user can switch to it or we force it.

        // Better: Clone the node, append to body, style it fixed/invisible, render, then remove.
        // However, html2canvas works best on visible elements.

        // Let's notify user if they are not in view provided mode, or just handle it.

        // We will show a loading indicator
        const btn = document.querySelector('.btn-export');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Generando PDF...";
            btn.disabled = true;
        }

        html2canvas(input, {
            scale: 2, // High resolution
            useCORS: true, // For images if any
            backgroundColor: '#0a1628', // Ensure background
            logging: false,
            windowWidth: 1400 // Force desktop width render
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = imgWidth / imgHeight;
            const width = pdfWidth;
            const height = width / ratio;

            // If height > pdfHeight, we might need pages. 
            // For now, let's just scale to fit or split. 
            // Splitting canvas is hard. Let's try to fit or add multipage support if really long.

            // Simple approach: One long page or scale to fit width.

            if (height > pdfHeight) {
                // Multipage logic
                let heightLeft = height;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, width, height);
                heightLeft -= pdfHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - height;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, width, height);
                    heightLeft -= pdfHeight;
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            }

            pdf.save(`Ficha_${data.nombre_real || 'S9U'}.pdf`);

            if (btn) {
                btn.innerText = "PDF (Estilizado)";
                btn.disabled = false;
            }
        }).catch(err => {
            console.error("Error generating PDF", err);
            alert("Hubo un error al generar el PDF. Intenta visualizar la ficha completa primero.");
            if (btn) {
                btn.innerText = "PDF (Estilizado)";
                btn.disabled = false;
            }
        });
    }
};

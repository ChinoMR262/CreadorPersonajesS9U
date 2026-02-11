window.ExportDOCX = {
    download: function (data) {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, UnderlineType } = docx;

        // --- STYLES HELPER ---
        const heading = (text, level) => new Paragraph({
            text: text,
            heading: level,
            spacing: { before: 200, after: 100 },
            alignment: AlignmentType.CENTER
        });

        const subHeading = (text) => new Paragraph({
            children: [new TextRun({ text: text, bold: true, size: 24 })],
            spacing: { before: 150, after: 50 },
            alignment: AlignmentType.LEFT
        });

        const normalText = (label, value) => new Paragraph({
            children: [
                new TextRun({ text: label + ": ", bold: true }),
                new TextRun(value || "---")
            ],
            spacing: { after: 100 }
        });

        const blockText = (text) => new Paragraph({
            text: text || "---",
            spacing: { after: 100 }
        });

        // --- CONTENT BUILDING ---
        const sections = [];

        // TITLE
        sections.push(new Paragraph({
            children: [new TextRun({ text: "S9U - FICHA DE PERSONAJE", bold: true, size: 32 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
        }));

        // I. IDENTIDAD
        sections.push(heading("I. IDENTIDAD & ORIGEN", HeadingLevel.HEADING_2));
        sections.push(normalText("Nombre Real", data.nombre_real));
        sections.push(normalText("Alias/Apodo", data.apodo));
        sections.push(normalText("Edad", data.edad));
        sections.push(normalText("Raza", data.raza));
        sections.push(normalText("Ocupación", data.ocupacion));
        sections.push(normalText("Origen", data.origen));

        // II. ARQUETIPO
        sections.push(heading("II. ARQUETIPO & MORAL", HeadingLevel.HEADING_2));
        sections.push(normalText("Arquetipo", data.arquetipo));
        sections.push(normalText("Alineamiento", data.alineamiento));
        sections.push(subHeading("Creencia Central"));
        sections.push(new Paragraph({ text: `"${data.creencia || '...'}"`, italics: true }));

        // III. ATRIBUTOS
        sections.push(heading("III. ATRIBUTOS", HeadingLevel.HEADING_2));
        const attrs = [
            ["Fuerza", data.fuerza], ["Destreza", data.destreza], ["Constitución", data.constitucion],
            ["Inteligencia", data.inteligencia], ["Sabiduría", data.sabiduria], ["Carisma", data.carisma]
        ];

        // Simple table for attributes
        const tableRows = [
            new TableRow({
                children: attrs.map(a => new TableCell({ children: [new Paragraph({ text: a[0], bold: true })] }))
            }),
            new TableRow({
                children: attrs.map(a => new TableCell({ children: [new Paragraph({ text: String(a[1] || 10) })] }))
            })
        ];

        sections.push(new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
        sections.push(new Paragraph("")); // Spacer

        // IV. PSICOLOGIA
        sections.push(heading("IV. MAPA PSICOLÓGICO", HeadingLevel.HEADING_2));
        sections.push(subHeading("Rasgos de Personalidad"));
        sections.push(blockText(data.rasgos));
        sections.push(subHeading("Motivaciones"));
        sections.push(blockText(data.motivaciones));
        sections.push(subHeading("Miedos y Fobias"));
        sections.push(blockText(data.miedos));
        sections.push(subHeading("Trastornos"));
        sections.push(blockText(data.trastornos));

        // V. HABILIDADES
        sections.push(heading("V. HABILIDADES & PODERES", HeadingLevel.HEADING_2));
        sections.push(subHeading("Habilidades Pasivas / Talentos"));
        sections.push(blockText(data.habilidades));
        sections.push(subHeading("Poderes / Magia"));
        sections.push(blockText(data.poderes));

        // VI. EQUIPO
        sections.push(heading("VI. EQUIPAMIENTO", HeadingLevel.HEADING_2));
        sections.push(subHeading("Armas"));
        sections.push(blockText(data.armas));
        sections.push(subHeading("Inventario"));
        sections.push(blockText(data.equipo));

        // VII. HISTORIA
        sections.push(heading("VII. HISTORIA", HeadingLevel.HEADING_2));
        sections.push(blockText(data.historia));

        // VIII. APARIENCIA
        sections.push(heading("VIII. APARIENCIA", HeadingLevel.HEADING_2));
        sections.push(blockText(data.apariencia_fisica));
        sections.push(new Paragraph(""));
        const appGrid = [
            `Altura: ${data.altura || '-'} | Peso: ${data.peso || '-'}`,
            `Complexión: ${data.complexion || '-'} | Piel: ${data.piel || '-'}`,
            `Ojos: ${data.ojos || '-'} | Cabello: ${data.cabello || '-'}`
        ];
        appGrid.forEach(line => sections.push(new Paragraph({ text: line, spacing: { after: 50 } })));

        sections.push(subHeading("Rasgos Extra"));
        sections.push(blockText(data.alas_o_rasgos_extra));

        // IX. NARRATIVA
        sections.push(heading("IX. NARRATIVA & DESTINO", HeadingLevel.HEADING_2));
        sections.push(subHeading("Profecía"));
        sections.push(blockText(data.profecia_texto));
        sections.push(subHeading("Rol Narrativo"));
        sections.push(blockText(data.rol_narrativo));

        // X. RELACIONES
        sections.push(heading("X. RELACIONES", HeadingLevel.HEADING_2));
        if (data.relaciones && data.relaciones.length > 0) {
            data.relaciones.forEach(r => {
                sections.push(new Paragraph({
                    children: [
                        new TextRun({ text: `• ${r.nombre || '???'} `, bold: true }),
                        new TextRun({ text: `(${r.rol || 'Vínculo'}) - ${r.tipo || 'Relación'}`, italics: true })
                    ]
                }));
                if (r.desc) sections.push(new Paragraph({ text: `  ${r.desc}`, indent: { left: 720 } }));
            });
        } else {
            sections.push(blockText("Sin registros."));
        }

        // XI. RESUMEN
        sections.push(heading("XI. RESUMEN FINAL", HeadingLevel.HEADING_2));
        sections.push(blockText(data.resumen_final));
        sections.push(subHeading("Puntos Clave"));
        sections.push(blockText(data.resumen_puntos_clave));

        // GENERATE
        const doc = new Document({
            sections: [{
                properties: {},
                children: sections
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `Ficha_${data.nombre_real || 'S9U'}.docx`);
        });
    }
};

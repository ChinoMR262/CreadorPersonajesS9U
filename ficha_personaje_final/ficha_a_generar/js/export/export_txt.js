window.ExportTXT = {
    download: function (data) {
        const getVal = (key) => {
            const val = data[key];
            if (!val || (typeof val === 'string' && val.trim() === '')) return "---";
            return val;
        };

        const separator = "=".repeat(60);
        const subSep = "-".repeat(60);
        const date = new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        let content = `${separator}
          ✨  FICHA DE PERSONAJE - S9U SYSTEM  ✨
${separator}
Generado por: Helios Psyche Engine v2.0
Fecha: ${date}
${separator}

I. IDENTIDAD & ORIGEN
${subSep}
» Nombre Real:       ${getVal('nombre_real')}
» Apodo / Alias:     ${getVal('apodo')}
» Edad:              ${getVal('edad')}
» Raza / Especie:    ${getVal('raza')}
» Ocupación:         ${getVal('ocupacion')}
» Lugar de Origen:   ${getVal('origen')}

II. ARQUETIPO & MORAL
${subSep}
» Arquetipo:         ${getVal('arquetipo')}
» Alineamiento:      ${getVal('alineamiento')}
» Creencia Central:  
  "${getVal('creencia')}"

III. ESTADÍSTICAS & ATRIBUTOS
${subSep}
[FUE] Fuerza:        ${getVal('fuerza')}
[DES] Destreza:      ${getVal('destreza')}
[CON] Constitución:  ${getVal('constitucion')}
[INT] Inteligencia:  ${getVal('inteligencia')}
[SAB] Sabiduría:     ${getVal('sabiduria')}
[CAR] Carisma:       ${getVal('carisma')}

IV. MAPA PSICOLÓGICO DETALLADO
${subSep}
[Rasgos de Personalidad]
${getVal('rasgos')}

[Motivaciones & Deseos]
${getVal('motivaciones')}

[Miedos & Fobias]
${getVal('miedos')}

[Trastornos, Manías & Excentricidades]
${getVal('trastornos')}

V. CAPACIDADES DE COMBATE & PODERES
${subSep}
[Habilidades Pasivas & Talentos]
${getVal('habilidades')}

[Poderes, Magia & Tecnología]
${getVal('poderes')}

VI. INVENTARIO & ARSENAL
${subSep}
[Armas Equipadas]
${getVal('armas')}

[Inventario General]
${getVal('equipo')}

VII. BIOGRAFÍA & TRASFONDO
${subSep}
${getVal('historia')}

VIII. APARIENCIA FÍSICA
${subSep}
Descripión General:
${getVal('apariencia_fisica')}

[Detalles Biométricos]
• Altura:      ${getVal('altura')}
• Peso:        ${getVal('peso')}
• Complexión:  ${getVal('complexion')}
• Piel:        ${getVal('piel')}
• Ojos:        ${getVal('ojos')}
• Cabello:     ${getVal('cabello')}

[Rasgos Distintivos (Alas, Marcas, Cicatrices)]
${getVal('alas_o_rasgos_extra')}

IX. NARRATIVA & DESTINO
${subSep}
[Profecía o Destino Escrito]
${getVal('profecia_texto')}

[Rol en la Historia (Meta-Narrativa)]
${getVal('rol_narrativo')}

X. VÍNCULOS & RELACIONES
${subSep}
`;

        if (data.relaciones && Array.isArray(data.relaciones) && data.relaciones.length > 0) {
            data.relaciones.forEach((r, index) => {
                content += `${index + 1}. ${r.nombre || 'Desconocido'}\n`;
                content += `   Rol: ${r.rol || '---'}\n`;
                content += `   Tipo: ${r.tipo || '---'}\n`;
                if (r.desc) content += `   Detalle: ${r.desc}\n`;
                content += `\n`;
            });
        } else {
            content += "No se han registrado relaciones.\n";
        }

        content += `${separator}
XI. RESUMEN DE CONVERGENCIA (RESULTADO FINAL)
${separator}
${getVal('resumen_final')}

[PUNTOS CLAVE PARA EL USUARIO]
${getVal('resumen_puntos_clave')}

${separator}
         (c) Creador S9U - Seres del Noveno Universo
${separator}
`;

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `Ficha_${(data.nombre_real || 'S9U').replace(/\s+/g, '_')}_Completa.txt`);
    }
};

const DB_FICHA = {
    generarDatosFicha: function (s) {
        // s = state global app

        // Helper safe access
        const get = (path, def = '') => {
            return path || def;
        };

        const r = s.rasgos || [];
        const m = s.motivaciones || [];
        const h = s.habilidades || [];
        const e = s.equipo || [];

        return {
            // I. IDENTIDAD
            nombre_real: s.nombre || 'Desconocido',
            apodo: '', // Se llena manual en editor
            edad: 'Desconocida',
            raza: get(s.raza, 'Humano'),
            origen: get(s.universo, 'Eon'),
            ocupacion: get(s.rolNarrativo, 'Aventurero'),

            // II. ARQUETIPO
            arquetipo: get(s.rolNarrativo, 'Héroe'), // O usar lógica compleja si estaba
            alineamiento: '',
            creencia: '',

            // III. ATRIBUTOS (Default 10)
            fuerza: 10,
            destreza: 10,
            constitucion: 10,
            inteligencia: 10,
            sabiduria: 10,
            carisma: 10,

            // IV. PSICOLOGIA
            rasgos: r.join(', '),
            motivaciones: s.deseos ? s.deseos.join(', ') : '',
            miedos: s.detesta ? s.detesta.join(', ') : '',
            trastornos: '',

            // V. HABILIDADES
            habilidades: h.map(x => x.nombre).join('\n'),
            poderes: '',

            // VI. EQUIPO
            armas: '',
            equipo: '',

            // VII. HISTORIA
            historia: s.historia || '',

            // VIII. APARIENCIA
            apariencia_fisica: (s.apariencia && s.apariencia.ropaje) ? `Ropaje: ${s.apariencia.ropaje}` : '',
            altura: '',
            peso: '',
            complexion: '',
            cabello: (s.apariencia && s.apariencia.cabello) ? s.apariencia.cabello : '',
            ojos: (s.apariencia && s.apariencia.ojos) ? s.apariencia.ojos : '',
            piel: (s.apariencia && s.apariencia.piel) ? s.apariencia.piel : '',
            alas_o_rasgos_extra: '',

            // IX. NARRATIVA
            profecia_texto: '',
            rol_narrativo: s.rolNarrativo || '',

            // X. RELACIONES
            // Se pasan como objetos o texto? El editor usa objetos. 
            // Aquí solo inicializamos texto si es para imprimir, pero el editor carga dinámico.
            // Dejamos vacío o pre-llenado en UI

            // META
            resumen_final: s.historiaCompleta || s.historia || '',
            resumen_puntos_clave: '',
            imagen_url: '' // Se podría intentar pasar si hubiera
        };
    }
};

// Export global
window.DB_FICHA = DB_FICHA;

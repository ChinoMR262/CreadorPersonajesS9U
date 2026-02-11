const DB_FICHA = {
    generarDatosFicha: function (s) {
        // s = state global app
        console.log('DB_FICHA: Generando ficha con estado:', s);

        // Helper safe access mejorado
        const get = (path, def = '') => {
            return path && typeof path !== 'undefined' ? path : def;
        };

        // Arrays seguros
        const r = Array.isArray(s.rasgos) ? s.rasgos : [];
        const m = Array.isArray(s.motivaciones) ? s.motivaciones : [];
        const h = Array.isArray(s.habilidades) ? s.habilidades : [];
        const e = Array.isArray(s.equipo) ? s.equipo : [];
        const d = Array.isArray(s.deseos) ? s.deseos : [];
        const det = Array.isArray(s.detesta) ? s.detesta : [];

        // Objeto de ficha completo
        const ficha = {
            // I. IDENTIDAD
            nombre_real: get(s.nombre, 'Desconocido'),
            apodo: get(s.alias, ''), // Usar alias del formulario
            edad: get(s.edadReal, 'Desconocida'),
            raza: get(s.raza, 'Humano'),
            origen: get(s.universo, 'Tierra'),
            planeta: get(s.planeta, 'Tierra'),
            ocupacion: get(s.rolNarrativo, 'Aventurero'),
            condicion: get(s.condicion, 'Humano'),
            rango: get(s.rango, 'Desconocido'),

            // II. ARQUETIPO
            arquetipo: get(s.rolNarrativo, 'Héroe'),
            alineamiento: this.getAlineamiento(s),
            creencia: get(s.tituloEspiritual, ''),

            // III. ATRIBUTOS (mejorar con datos reales si existen)
            fuerza: 10,
            destreza: 10,
            constitucion: 10,
            inteligencia: 10,
            sabiduria: 10,
            carisma: 10,

            // IV. PSICOLOGIA
            rasgos: r.length > 0 ? r.join(', ') : 'Por descubrir',
            motivaciones: d.length > 0 ? d.join(', ') : 'Por descubrir',
            miedos: det.length > 0 ? det.join(', ') : 'Por descubrir',
            trastornos: '', // Se podría calcular de test psicológico

            // V. HABILIDADES
            habilidades: h.length > 0 ? h.map(x => x.nombre || x).join('\n') : 'Por descubrir',
            poderes: this.getPoderesFromRaza(s.raza),

            // VI. EQUIPO
            armas: e.length > 0 ? e.filter(x => x.tipo === 'arma').map(x => x.nombre).join(', ') : '',
            equipo: e.length > 0 ? e.filter(x => x.tipo !== 'arma').map(x => x.nombre).join(', ') : '',

            // VII. HISTORIA
            historia: get(s.historia, ''),
            historia_completa: get(s.historiaCompleta, ''),

            // VIII. APARIENCIA
            apariencia_fisica: this.getAparienciaFisica(s),
            altura: get(s.altura, ''),
            peso: '', // No está en el formulario actual
            complexion: '',
            cabello: (s.apariencia && s.apariencia.cabello) ? s.apariencia.cabello : '',
            ojos: (s.apariencia && s.apariencia.ojos) ? s.apariencia.ojos : '',
            piel: (s.apariencia && s.apariencia.piel) ? s.apariencia.piel : '',
            alas_o_rasgos_extra: this.getRasgosExtra(s),

            // IX. NARRATIVA
            profecia_texto: '',
            rol_narrativo: get(s.rolNarrativo, ''),
            eslogan: get(s.eslogan, ''),

            // X. RELACIONES
            relaciones: this.getRelacionesFromState(s),

            // META
            resumen_final: get(s.historiaCompleta, get(s.historia, '')),
            resumen_puntos_clave: this.getPuntosClave(s),
            imagen_url: get(s.imagenUrl, ''),
            
            // Datos adicionales para compatibilidad
            genero: get(s.genero, ''),
            apodos: get(s.apodos, ''),
            signo_zodiaco: get(s.signoZodiaco, ''),
            edad_aparente: get(s.edadAparente, '')
        };

        console.log('DB_FICHA: Ficha generada:', ficha);
        return ficha;
    },

    // Funciones auxiliares mejoradas
    getAlineamiento: function(s) {
        const rol = s.rolNarrativo || '';
        if (rol.includes('Villano')) return 'Caótico Maligno';
        if (rol.includes('Héroe')) return 'Legal Bueno';
        if (rol.includes('AntiHéroe')) return 'Neutral';
        return 'Neutral';
    },

    getPoderesFromRaza: function(raza) {
        const poderesPorRaza = {
            'Humano': 'Adaptabilidad, Determinación',
            'Aquamaris': 'Control del agua, Sanación, Telepatía',
            'Umbra': 'Manipulación de sombras, Invisibilidad',
            'Ángel': 'Vuelo, Sanación divina, Luz sagrada',
            'Demonio': 'Control del fuego, Manipulación',
            'Sylvani': 'Comunicación con plantas, Cura natural'
        };
        return poderesPorRaza[raza] || 'Por descubrir';
    },

    getAparienciaFisica: function(s) {
        if (!s.apariencia) return 'Por describir';
        
        const partes = [];
        if (s.apariencia.ropaje) partes.push(`Ropaje: ${s.apariencia.ropaje}`);
        if (s.apariencia.cabello) partes.push(`Cabello: ${s.apariencia.cabello}`);
        if (s.apariencia.ojos) partes.push(`Ojos: ${s.apariencia.ojos}`);
        if (s.apariencia.piel) partes.push(`Piel: ${s.apariencia.piel}`);
        
        return partes.length > 0 ? partes.join(', ') : 'Por describir';
    },

    getRasgosExtra: function(s) {
        const rasgos = [];
        if (s.condicion && s.condicion.includes('Ángel')) rasgos.push('Alas angelicales');
        if (s.condicion && s.condicion.includes('Demonio')) rasgos.push('Cuernos, alas demoníacas');
        if (s.condicion && s.condicion.includes('Entidad')) rasgos.push('Aura etérea');
        return rasgos.join(', ') || 'Ninguno';
    },

    getRelacionesFromState: function(s) {
        // Si hay relaciones en el estado, formatearlas
        if (s.relaciones && Array.isArray(s.relaciones)) {
            return s.relaciones.map(rel => 
                `${rel.nombre || rel.nombreRelacion} (${rel.tipo || 'Desconocido'})`
            ).join('\n');
        }
        return 'Por establecer';
    },

    getPuntosClave: function(s) {
        const puntos = [];
        if (s.nombre) puntos.push(`Nombre: ${s.nombre}`);
        if (s.rolNarrativo) puntos.push(`Rol: ${s.rolNarrativo}`);
        if (s.raza) puntos.push(`Raza: ${s.raza}`);
        if (s.universo) puntos.push(`Origen: ${s.universo}`);
        return puntos.join(' | ');
    }
};

// Export global
window.DB_FICHA = DB_FICHA;

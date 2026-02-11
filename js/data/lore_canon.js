/**
 * LORE CANÓNICO DEL NOVENO UNIVERSO (S9U)
 * Base de datos oficial del universo narrativo
 */

const LORE_CANON = {
    // --- UNIVERSOS Y PLANETAS ---
    universos: [
        {
            id: "eon",
            name: "Eon",
            description: "Universo antiguo extinto, cuna de los Eonios",
            planetas: ["Urse (Extinto)"],
            razas: ["Eonios (extintos)"],
            estado: "extinto"
        },
        {
            id: "umbra",
            name: "Umbra", 
            description: "Reino de sombras y seres etéreos",
            planetas: ["Umbra"],
            razas: ["Umbra (seres de sombra)"],
            estado: "activo"
        },
        {
            id: "tierra",
            name: "Tierra",
            description: "Planeta origen de la humanidad",
            planetas: ["Tierra"],
            razas: ["Humanos"],
            estado: "activo"
        },
        {
            id: "petro",
            name: "Petro",
            description: "Mundo rocoso habitado por seres de piedra",
            planetas: ["Petro"],
            razas: ["Petro (seres rocosos)"],
            estado: "activo"
        },
        {
            id: "posidonia",
            name: "Posidonia",
            description: "Reino acuático de los Aquamaris",
            planetas: ["Posidonia"],
            razas: ["Aquamaris"],
            estado: "activo"
        },
        {
            id: "ignis",
            name: "Ignis",
            description: "Mundo de fuego y magma",
            planetas: ["Ignis"],
            razas: ["Ignareos (seres de magma)"],
            estado: "activo"
        },
        {
            id: "aeris",
            name: "Aer (Aeris)",
            description: "Dominio aéreo de las entidades etéreas",
            planetas: ["Aeris"],
            razas: ["Aeris (entidades aéreas)"],
            estado: "activo"
        },
        {
            id: "sylvan",
            name: "Sylvan",
            description: "Bosque primordial de los Sylvani",
            planetas: ["Sylvan"],
            razas: ["Sylvani"],
            estado: "activo"
        },
        {
            id: "siul_kairon",
            name: "Siul & Kairon",
            description: "Sistema dual de energía y conciencia",
            planetas: ["Siul", "Kairion"],
            razas: ["Siulcianos", "Ángeles", "Raza Angelical", "Kairianos", "Veyru", "Crysari", "Náyren", "Éthrios"],
            estado: "activo"
        }
    ],

    // --- RAZAS Y LINAJES ---
    razas: [
        {
            id: "humanos",
            name: "Humanos",
            universo: "tierra",
            planeta: "Tierra",
            caracteristicas: ["Adaptables", "Creativos", "Emocionales"],
            habilidades_especiales: ["Determinación", "Innovación", "Resiliencia"]
        },
        {
            id: "aquamaris",
            name: "Aquamaris",
            universo: "posidonia",
            planeta: "Posidonia",
            caracteristicas: ["Acuáticos", "Telepáticos", "Curadores"],
            habilidades_especiales: ["Control del agua", "Sanación", "Comunicación marina"]
        },
        {
            id: "umbra",
            name: "Umbra",
            universo: "umbra",
            planeta: "Umbra",
            caracteristicas: ["Etéreos", "Sombríos", "Misteriosos"],
            habilidades_especiales: ["Manipulación de sombras", "Invisibilidad", "Viaje dimensional"]
        },
        {
            id: "ignareos",
            name: "Ignareos",
            universo: "ignis",
            planeta: "Ignis",
            caracteristicas: ["Fuego", "Pasión", "Destructivos"],
            habilidades_especiales: ["Control del fuego", "Resistencia al calor", "Forja mágica"]
        },
        {
            id: "angeles",
            name: "Ángeles",
            universo: "siul_kairon",
            planeta: "Siul",
            caracteristicas: ["Divinos", "Sabios", "Protectores"],
            habilidades_especiales: ["Vuelo", "Sanación divina", "Luz sagrada"]
        },
        {
            id: "sylvani",
            name: "Sylvani",
            universo: "sylvan",
            planeta: "Sylvan",
            caracteristicas: ["Naturaleza", "Sabiduría", "Conexión vital"],
            habilidades_especiales: ["Comunicación con plantas", "Cura natural", "Crecimiento acelerado"]
        }
    ],

    // --- EVENTOS HISTÓRICOS ---
    eventos_historicos: [
        {
            id: "ascension_serafines",
            name: "Ascensión de los Serafines",
            descripcion: "Evento en que los Ángeles intentaron ascender a divinidad",
            fecha: "Era Primordial",
            consecuencias: ["Creación de planos divinos", "Ruptura dimensional", "Nacimiento de La Sombra"],
            participantes: ["Ángeles", "Serafines", "Entidades Primordiales"]
        },
        {
            id: "guerra_eon_umbra",
            name: "Guerra Eon-Umbra",
            descripcion: "Conflicto que extinguió a los Eonios",
            fecha: "Era Antigua",
            consecuencias: ["Extinción de los Eonios", "Expansión de Umbra", "Creación de barreras dimensionales"],
            participantes: ["Eonios", "Umbra", "Ser de Sombras"]
        },
        {
            id: "corazon_siul",
            name: "Manifestación del Corazón de Siul",
            descripcion: "Aparición de la fuente de energía vital del universo",
            fecha: "Era Media",
            consecuencias: ["Equilibrio universal", "Nuevas razas con poder", "Estabilidad dimensional"],
            participantes: ["Siulcianos", "Entidades de Kairion", "Guardianes"]
        },
        {
            id: "retorno_sombra",
            name: "El Retorno de La Sombra",
            descripcion: "La Sombra primordial comienza a manifestarse nuevamente",
            fecha: "Era Actual",
            consecuencias: ["Crisis dimensional", "Nuevos héroes", "Unión de razas"],
            participantes: ["La Sombra", "Defensores", "Todas las razas"]
        }
    ],

    // -- ENTIDADES PODEROSAS ---
    entidades: [
        {
            id: "sombra",
            name: "La Sombra",
            tipo: "Entidad Primordial",
            descripcion: "Fuerza oscura que consume la luz y la vida",
            alineamiento: "Caótico Maligno",
            poder: "Consumir realidades",
            estado: "Activa y creciendo"
        },
        {
            id: "siul",
            name: "Siul",
            tipo: "Entidad Vital",
            descripcion: "Conciencia colectiva del universo, fuente de vida",
            alineamiento: "Neutral Benevolente",
            poder: "Creación y sanación",
            estado: "Dormida pero accesible"
        },
        {
            id: "kairion",
            name: "Kairion",
            tipo: "Entidad Energética",
            descripcion: "Energía pura sin forma ni conciencia definida",
            alineamiento: "Caótico Neutral",
            poder: "Manipulación de la realidad",
            estado: "Inestable y salvaje"
        },
        {
            id: "corazon_siul",
            name: "Corazón de Siul",
            tipo: "Artefacto Legendario",
            descripcion: "Manifestación física del poder vital de Siul",
            alineamiento: "Bondadoso",
            poder: "Sanación masiva y renovación",
            estado: "Fragmentado y escondido"
        }
    ],

    // --- LUGARES SAGRADOS Y PELIGROSOS ---
    lugares: [
        {
            id: "templo_siul",
            name: "Templo de Siul",
            tipo: "Lugar Sagrado",
            ubicacion: "Siul",
            descripcion: "Centro de poder donde Siul puede ser contactado",
            peligros: ["Guardianes espirituales", "Pruebas de pureza"],
            recompensas: ["Sabiduría ancestral", "Poder de sanación"]
        },
        {
            id: "abismo_umbra",
            name: "Abismo de Umbra",
            tipo: "Zona Peligrosa",
            ubicacion: "Frontera Umbra-Eon",
            descripcion: "Cicatriz dimensional de la guerra antigua",
            peligros: ["Criaturas de sombra", "Distorsión temporal"],
            recompensas: ["Conocimiento perdido", "Artefactos Eonios"]
        },
        {
            id: "fuegos_ignis",
            name: "Fuegos Eternos de Ignis",
            tipo: "Lugar Elemental",
            ubicacion: "Núcleo de Ignis",
            descripcion: "Fuentes primordiales de fuego mágico",
            peligros: ["Temperaturas extremas", "Espíritus de fuego"],
            recompensas: ["Forja divina", "Control elemental"]
        }
    ],

    // --- CONCEPTOS MÁGICOS Y PODERES ---
    conceptos_magicos: [
        {
            id: "convergencia",
            name: "Convergencia",
            descripcion: "Fenómeno donde múltiples realidades se alinean",
            efectos: ["Aumento de poder", "Acceso a otras dimensiones", "Inestabilidad temporal"],
            requisitos: ["Alineación planetaria", "Energía vital", "Concentración"]
        },
        {
            id: "sintonia_animal",
            name: "Sintonía Animal",
            descripcion: "Vínculo espiritual entre un ser y un animal/ente",
            efectos: ["Comunicación telepática", "Poderes compartidos", "Transformación parcial"],
            requisitos: ["Compatibilidad espiritual", "Ritual de unión", "Confianza mutua"]
        },
        {
            id: "ascension",
            name: "Ascensión",
            descripcion: "Elevación del ser a un estado superior de existencia",
            efectos: ["Trascendencia física", "Poder divino", "Inmortalidad"],
            requisitos: ["Sabiduría absoluta", "Sacrificio personal", "Aprobación universal"]
        }
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') window.LORE_CANON = LORE_CANON;
if (typeof module !== 'undefined') module.exports = LORE_CANON;

/**
 * BASE DE DATOS DEL MOTOR PSICOLÓGICO HELIOS (S9U)
 * 
 * Este archivo contiene la lógica profunda de análisis de personalidad.
 * Helios utiliza estas estructuras para generar perfiles psicológicos "vanguardistas" y profundos
 * basados en las respuestas del Test de Convergencia (Logic, Emotion, Creativity, Conflict, Ethics).
 */

const HELIOS_DATA_VERSION = "2.0.0";

// ============================================================
// 1. ARQUETIPOS DE HELIOS (DOMINANTES)
// ============================================================
// Se activan según el puntaje más alto en el Test de Convergencia.
const HELIOS_ARCHETYPES = {
    // LÓGICA
    logic: {
        title: "Arquitecto de la Razón",
        archetype: "El Soberano de los Sistemas",
        desc: "Tu mente opera como un mecanismo perfecto de causa y efecto. Donde otros ven caos, tú ves patrones esperando ser descifrados. No buscas la victoria por la fuerza, sino por la inevitabilidad del cálculo.",
        villain_title: "Tirano de la Lógica Absoluta",
        villain_desc: "Has eliminado la variable del caos, sacrificando la libertad en el altar del orden perfecto. Para ti, la emoción es un error de sistema que debe ser depurado.",
        slogan: "La verdad es estructura.",
        symbol: "Un cubo de cristal perfecto flotando en el vacío."
    },
    // EMOCIÓN
    emotion: {
        title: "Voz de las Corrientes",
        archetype: "El Empático Primordial",
        desc: "Eres el puente entre las almas. Tu fuerza no reside en el acero, sino en la capacidad de sentir la resonancia de todo lo que vive. Entiendes que la verdad más profunda no se piensa, se siente.",
        villain_title: "Manipulador de Almas",
        villain_desc: "Usas los sentimientos como hilos para mover a tus marionetas. Conoces cada grieta en el corazón de tus enemigos y las usas para quebrarlos desde adentro.",
        slogan: "Sentir es existir.",
        symbol: "Un corazón hecho de agua luminosa."
    },
    // CREATIVIDAD
    creativity: {
        title: "Tejedor de Realidades",
        archetype: "El Visionario Caótico",
        desc: "Para ti, lo imposible es solo un boceto esperando ser terminado. No sigues caminos, los inventas. Tu mente es un vórtice de ideas que desafía las leyes de la física y la convención.",
        villain_title: "Agente del Caos",
        villain_desc: "Destruyes la realidad solo para ver qué formas nuevas surgen de las cenizas. Tu arte es el desastre; tu pincel, la entropía.",
        slogan: "Imaginar es crear.",
        symbol: "Una nebulosa de colores cambiantes."
    },
    // CONFLICTO
    conflict: {
        title: "Señor de la Voluntad",
        archetype: "El Conquistador Implacable",
        desc: "Crees que la vida es una forja donde solo lo fuerte sobrevive. No rehúyes el enfrentamiento; lo buscas como la única forma honesta de interacción. Tu palabra es ley porque tienes la fuerza para imponerla.",
        villain_title: "Devorador de Mundos",
        villain_desc: "La paz es estancamiento. Solo en la guerra eterna encunetras propósito. Eres la tormenta que arrasa con todo para probar su propia existencia.",
        slogan: "El poder es la única verdad.",
        symbol: "Una espada clavada en una roca partida."
    },
    // ÉTICA (Orden/Justicia)
    ethics: {
        title: "Guardián del Equilibrio",
        archetype: "El Juez Incorruptible",
        desc: "Eres el escudo contra la oscuridad y la brújula en la tormenta. Tus principios son inquebrantables. Actúas no por conveniencia, sino porque es lo Correcto. Eres el pilar sobre el que descansa la civilización.",
        villain_title: "Inquisidor Dogmático",
        villain_desc: "Tu justicia no conoce piedad. Estás dispuesto a quemar el mundo entero si con ello purgas el pecado. Para ti, la inocencia no existe, solo grados de culpabilidad.",
        slogan: "El honor ante todo.",
        symbol: "Una balanza de oro equilibrada perfectamente."
    }
};

// ============================================================
// 2. DICCIONARIO DE RASGOS (TRAITS)
// ============================================================
// Descripciones cortas y profundas para los rasgos obtenidos en las preguntas.
const HELIOS_TRAIT_DESCRIPTIONS = {
    // Generales
    "Valiente": "El miedo no es tu límite, es tu combustible.",
    "Determinado": "Una vez fijas tu mirada, el destino se aparta.",
    "Analítico": "Diseccionas la realidad hasta hallar su núcleo.",
    "Observador": "Nada escapa a tu vigilancia silenciosa.",
    "Protector": "Tu escudo es el refugio de los olvidados.",
    "Altruista": "Das de ti mismo hasta que no queda nada.",
    "Superviviente": "La adversidad te ha tallado, pero no te ha roto.",
    "Cauteloso": "Cada paso tuyo es una decisión de vida o muerte.",
    "Ambicioso": "El horizonte no es el fin, es el comienzo de tu reino.",
    "Audaz": "Saltas al abismo confiando en que te saldrán alas.",
    "Erudito": "El conocimiento es el poder más puro que existe.",
    "Prudente": "La paciencia es el arma de los sabios.",
    "Leal": "Tu fidelidad es un juramento escrito en sangre.",
    "Ciudadano": "Crees en la fuerza de la comunidad sobre el individuo.",
    "Desconfiado": "La confianza se gana con cicatrices, no con palabras.",
    "Justiciero": "Donde la ley falla, tu mano equilibra la balanza.",
    // Villanos
    "Despiadado": "La piedad es un lujo que los fuertes no pueden permitirse.",
    "Cruel": "Encuentras arte en el sufrimiento ajeno.",
    "Dominante": "Naciste para mandar; los demás, para obedecer.",
    "Manipulador": "La mente ajena es tu tablero de juego favorito.",
    "Arrogante": "Tu superioridad no es una creencia, es un hecho.",
    "Teatral": "El mundo es tu escenario y exige un espectáculo sangriento.",
    "Calculador": "Cada emoción es una variable; cada persona, un número.",
    "Terrorista": "El miedo es el único lenguaje que todos entienden.",
    "Cínico": "Has visto la verdad del mundo y es una broma cruel.",
    "Poderoso": "La fuerza bruta es la única autoridad real.",
    "Intelectual": "Tu mente es un arma más letal que cualquier espada.",
    "Psicológico": "Destruyes al enemigo desde adentro, donde no puede defenderse.",
    "Indiferente": "El sufrimiento de las hormigas no concierne al dios.",
    "Superior": "Estás más allá del bien y del mal.",
    "Visionario": "Ves el futuro que nadie más se atreve a soñar.",
    "Seductor": "Prometes paraísos para liderar hacia el infierno.",
    // Héroes
    "Mártir": "Tu sacrificio será la semilla de un nuevo amanecer.",
    "Valeroso": "Brillas más fuerte cuanto más oscura es la noche.",
    "Humilde": "La grandeza no necesita corona, solo actos.",
    "Abnegado": "Vives para servir, mueres para proteger.",
    "Trágico": "Llevas el peso del mundo en una espalda cicatrizada.",
    "Optimista": "Incluso en el vacío, encuentras una estrella.",
    "Ingenioso": "No necesitas fuerza cuando tienes imaginación.",
    // MBTI - Analistas
    "Obsesivo": "Una sola idea domina tu existencia hasta consumirla.",
    "Científico": "El universo es un laboratorio; la moral, un obstáculo.",
    "Oportunista": "El caos es una escalera que sabes subir.",
    "Hacker": "Los sistemas son rompecabezas esperando tu solución.",
    "Filósofo": "Buscas el 'por qué' mientras otros se conforman con el 'qué'.",
    "Abstracto": "Vives en un mundo de ideas puras.",
    "Pragmático": "Solo lo que funciona es real.",
    // MBTI - Diplomáticos
    "Empático": "Sientes el dolor del mundo como propio.",
    "Telepático": "Las palabras sobran cuando las almas se tocan.",
    "Compasivo": "Tu corazón es un refugio inagotable.",
    "Vacilante": "La duda es el precio de ver todos los lados.",
    "Manipulador Emocional": "Usas el amor como un arma de asedio.",
    "Profesional": "El deber está por encima del sentimiento.",
    "Estoico": "Eres la roca contra la que se rompen las olas emocionales.",
    // Lore S9U
    "Crítico": "Cuestionas a los dioses porque ves sus fallas.",
    "Creyente": "La fe es tu armadura y tu espada.",
    "Pesimista": "Esperas lo peor y rara vez te decepcionas.",
    "Realista": "Ves el mundo tal como es, sin filtros ni esperanzas vanas.",
    "Controlador": "El orden debe imponerse, cueste lo que cueste.",
    "Fluído": "Eres como el agua: te adaptas o destruyes.",
    "Caótico": "El orden es una mentira; el caos es la verdad.",
    "Noble": "Tu linaje es espiritual, nobleza de alma.",
    "Destructor": "Para construir lo nuevo, lo viejo debe arder."
};

// ============================================================
// 3. PATRONES DE ANÁLISIS CRUZADO (PATRONES DE SINERGIA)
// ============================================================
// Genera párrafos narrativos complejos analizando combinaciones de puntajes.
const HELIOS_PSYCHE_PATTERNS = {
    // LÓGICA + CREATIVIDAD
    logic_creativity_high: "Posees una mente singular: 'El Ingeniero del Caos'. Eres capaz de estructurar lo abstracto. Donde otros ven sueños imposibles, tú ves planos y esquemas. Tu creatividad no es aleatoria; es una arquitectura funcional de lo imposible.",

    // LÓGICA + CONFLICTO (Frialdad Táctica)
    logic_conflict_high: "Eres un estratega nato. Separas la emoción de la ejecución. Para ti, el conflicto no es personal, es un problema de optimización de recursos. Tu eficiencia en la batalla roza lo aterrador por su falta de duda.",

    // EMOCIÓN + ÉTICA (El Paladín del Corazón)
    emotion_ethics_high: "Tu brújula moral está imantada por la compasión. No sigues reglas ciegas, sino principios vivos. Entiendes que la verdadera justicia debe tener rostro humano. Eres el refugio natural para los perdidos.",

    // EMOCIÓN + CONFLICTO (La Tormenta Pasional)
    emotion_conflict_high: "Eres fuego en movimiento. Luchas con el corazón en la mano. Tu ira es justa y tu amor es feroz. No conoces la tibieza; amas u odias con la fuerza de un maremoto. Tus enemigos temen tu pasión tanto como tu espada.",

    // CREATIVIDAD + CAOS (Bajo Orden)
    creativity_chaos_high: "Eres un agente de cambio puro. Las estructuras te asfixian. Necesitas romper moldes constantemente. Tu mente es un caleidoscopio que gira sin cesar, generando realidades que nadie más podría concebir.",

    // ÉTICA + LÓGICA (El Legislador)
    ethics_logic_high: "Crees en un universo ordenado y justo. Tus decisiones son imparciales, a veces hasta el punto de parecer frías. Buscas el bien mayor, calculado matemáticamente. Eres la columna vertebral de cualquier sociedad.",

    // VILLANO + INTUICIÓN (El Manipulador Maestro)
    villain_intuitive: "No eres un monstruo bruto; eres algo peor. Eres quien susurra en la oscuridad. Entiendes los miedos de tus víctimas mejor que ellas mismas. Tu maldad es sofisticada, psicológica y casi artística.",

    // HÉROE + PRAGMATISMO (El Héroe Oscuro)
    hero_pragmatic: "Haces lo necesario. No buscas la gloria ni la pureza moral, sino resultados. Estás dispuesto a mancharte las manos de sangre para que otros puedan mantenerlas limpias. Eres el guardián silencioso.",

    // ANIMAL TOTÉMICO: SINCRONÍA
    animal_synergy: (animalName) => `Tu vínculo con ${animalName || 'tu tótem'} amplifica tus instintos naturales. No es solo un compañero, es un espejo de tu alma que refleja tus verdades más ocultas.`
};

// ============================================================
// 4. GENERADOR DE LECTURA (Motor)
// ============================================================
function generateHeliosPyscheReport(meta, role, animalName) {
    // 1. Determinar Dominante
    const sorted = Object.entries(meta).sort((a, b) => b[1] - a[1]);
    const dominantKey = sorted[0][0];
    const secondaryKey = sorted[1] ? sorted[1][0] : null;

    // 2. Seleccionar Arquetipo Base
    const baseArch = HELIOS_ARCHETYPES[dominantKey] || HELIOS_ARCHETYPES.logic;
    const isVillain = (role === 'Villano' || role === 'Antihéroe' || role === 'Tirano');

    // 3. Construir Título y Descripción Arquetípica
    const title = isVillain ? baseArch.villain_title : baseArch.title;
    const description = isVillain ? baseArch.villain_desc : baseArch.desc;

    // 4. Análisis de Sinergia (Combinaciones)
    let synergyText = "";

    // Lógica + Creatividad
    if (meta.logic > 3 && meta.creativity > 3) synergyText += HELIOS_PSYCHE_PATTERNS.logic_creativity_high + " ";
    // Lógica + Conflicto
    else if (meta.logic > 3 && meta.conflict > 3) synergyText += HELIOS_PSYCHE_PATTERNS.logic_conflict_high + " ";
    // Emoción + Ética
    else if (meta.emotion > 3 && meta.ethics > 3) synergyText += HELIOS_PSYCHE_PATTERNS.emotion_ethics_high + " ";
    // Emoción + Conflicto
    else if (meta.emotion > 3 && meta.conflict > 3) synergyText += HELIOS_PSYCHE_PATTERNS.emotion_conflict_high + " ";
    // Creatividad + Caos (Asumimos Caos como bajo Orden/Ética)
    else if (meta.creativity > 4 && meta.ethics < 2) synergyText += HELIOS_PSYCHE_PATTERNS.creativity_chaos_high + " ";
    // Ética + Lógica
    else if (meta.ethics > 3 && meta.logic > 3) synergyText += HELIOS_PSYCHE_PATTERNS.ethics_logic_high + " ";

    // Sinergias de Rol
    if (isVillain && (meta.creativity > 3 || meta.logic > 3)) synergyText += HELIOS_PSYCHE_PATTERNS.villain_intuitive + " ";
    if (!isVillain && meta.conflict > 3 && meta.logic > 3) synergyText += HELIOS_PSYCHE_PATTERNS.hero_pragmatic + " ";

    // Sinergia Animal
    if (animalName && animalName !== 'Ningún Animal / Sintonía Neutra') {
        synergyText += `\n\n${HELIOS_PSYCHE_PATTERNS.animal_synergy(animalName)}`;
    }

    return {
        title: title,
        archetype: baseArch.archetype, // Nombre poético "El Soberano..."
        description: description,
        synergy: synergyText.trim(),
        slogan: baseArch.slogan,
        symbol: baseArch.symbol
    };
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.HELIOS_ARCHETYPES = HELIOS_ARCHETYPES;
    window.HELIOS_TRAIT_DESCRIPTIONS = HELIOS_TRAIT_DESCRIPTIONS;
    window.HELIOS_PSYCHE_PATTERNS = HELIOS_PSYCHE_PATTERNS;
    window.generateHeliosPyscheReport = generateHeliosPyscheReport;
}
if (typeof module !== 'undefined') {
    module.exports = { HELIOS_ARCHETYPES, HELIOS_TRAIT_DESCRIPTIONS, HELIOS_PSYCHE_PATTERNS, generateHeliosPyscheReport };
}

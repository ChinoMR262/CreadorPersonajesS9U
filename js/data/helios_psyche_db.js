/**
 * BASE DE DATOS DE PSIQUE HELIOS (Análisis Psicológico)
 * 
 * Define los arquetipos resultantes basados en los ejes:
 * - LIGHT (Luz/Oscuridad): Moralidad, Intención.
 * - ORDER (Orden/Caos): Método, Estructura.
 * - PSYCHE (Empatía/Frialdad): Conexión Emocional.
 */

const HELIOS_ARCHETYPES_DB = [
    // --- ARQUETIPOS DE LUZ (HÉROES / SANTOS) ---
    {
        id: "paladin_absoluto",
        req: { min_light: 5, min_order: 3 },
        title: "El Paladín Absoluto",
        desc: "Un faro inquebrantable de orden y justicia. Tu moralidad es rígida pero radiante.",
        analysis: "Helios detecta una estructura psicológica cristalina. No hay dudas en tu núcleo, solo una certeza cegadora sobre lo que es correcto. Tus acciones están dictadas por un código inquebrantable que inspira a otros pero que puede volverse inflexible.",
        quote: "La ley es la luz que separa la existencia de la nada."
    },
    {
        id: "santo_martir",
        req: { min_light: 5, max_order: 2, min_psyche: 4 },
        title: "El Santo Mártir",
        desc: "Sacrificio puro por el bien mayor. Emoción desbordante.",
        analysis: "Tu empatía no tiene límites, llegando al punto de la autodestrucción. Valoras la vida ajena infinitamente más que la propia. Eres el corazón que sangra para que otros puedan vivir.",
        quote: "Si mi dolor compra su paz, es un precio barato."
    },

    // --- ARQUETIPOS DE OSCURIDAD (VILLANOS / TIRANOS) ---
    {
        id: "tirano_obsidiana",
        req: { max_light: -4, min_order: 4 },
        title: "El Tirano de Obsidiana",
        desc: "Orden impuesto a través del miedo y la subyugación absoluta.",
        analysis: "Crees que el libre albedrío es un error que debe ser corregido. Tu crueldad no es pasional, es una herramienta quirúrgica para extirpar la disidencia. Eres la mano de hierro que el universo 'necesita'.",
        quote: "La paz es solo obediencia silenciosa."
    },
    {
        id: "agente_caos",
        req: { max_light: -3, max_order: -4 },
        title: "El Heraldo de la Entropía",
        desc: "Destrucción por el placer de ver el mundo arder.",
        analysis: "Rechazas cualquier forma de estructura. Encuentras belleza en la aniquilación y libertad en el colapso. No buscas gobernar las cenizas, solo crearlas.",
        quote: "Reconstruir es aburrido. Romper es arte."
    },

    // --- ARQUETIPOS GRISES / NEUTRALES ---
    {
        id: "mercader_almas",
        req: { max_light: 1, min_light: -1, min_order: 2, max_psyche: 0 },
        title: "El Mercader de Destinos",
        desc: "Pragmático, transaccional y enfocado en el beneficio mutuo (o propio).",
        analysis: "Ves el universo como un libro de contabilidad. Nada es bueno o malo, solo rentable o costoso. Eres un aliado valioso pero un amigo peligroso.",
        quote: "Todo tiene un precio, incluso la salvación."
    },
    {
        id: "caminante_gris",
        req: { max_light: 2, min_light: -2 }, // Default catch-all for balanced
        title: "El Caminante del Velo Gris",
        desc: "Equilibrio entre fuerzas opuestas. Adaptabilidad.",
        analysis: "No te inclinas ante dioses de luz ni demonios de sombra. Entiende que ambos son necesarios para la existencia. Tu fuerza radica en tu capacidad de ver la verdad sin filtros dogmáticos.",
        quote: "La luz quema y la oscuridad congela. Yo camino en el medio."
    }
];

// Función Helper para determinar el arquetipo
function getHeliosArchetype(score) {
    // Score: { light, order, psyche }
    // Filtramos los que cumplen requisitos
    const candidates = HELIOS_ARCHETYPES_DB.filter(arch => {
        let match = true;
        if (arch.req.min_light !== undefined && score.light < arch.req.min_light) match = false;
        if (arch.req.max_light !== undefined && score.light > arch.req.max_light) match = false;

        if (arch.req.min_order !== undefined && score.order < arch.req.min_order) match = false;
        if (arch.req.max_order !== undefined && score.order > arch.req.max_order) match = false;

        if (arch.req.min_psyche !== undefined && score.psyche < arch.req.min_psyche) match = false;
        if (arch.req.max_psyche !== undefined && score.psyche > arch.req.max_psyche) match = false;

        return match;
    });

    // Si hay varios, priorizar el más específico (más requisitos) o el primero
    // Simple sort by number of keys in req
    candidates.sort((a, b) => Object.keys(b.req).length - Object.keys(a.req).length);

    return candidates.length > 0 ? candidates[0] : HELIOS_ARCHETYPES_DB.find(a => a.id === 'caminante_gris');
}

if (typeof window !== 'undefined') {
    window.HELIOS_ARCHETYPES_DB = HELIOS_ARCHETYPES_DB;
    window.getHeliosArchetype = getHeliosArchetype;
}

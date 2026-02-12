/**
 * BASE DE DATOS DE GENERACIÓN DE HISTORIAS (S9U)
 * 
 * Sistema de plantillas narrativas para la generación procedural de historias.
 * Soporta inyección de variables:
 * {N} = Nombre del personaje
 * {P} = Planeta de origen
 * {R} = Raza / Linaje
 * {C} = Clase / Rol
 * {A} = Animal Totémico
 */

const STORY_DATA_VERSION = "2.0.0";

const STORY_TEMPLATES = {
    // 1. ORIGEN (Basado en Universo/Raza o Genérico)
    origins: {
        "generic": [
            "{N} nació bajo el cielo incierto de {P}, donde la supervivencia es la primera lección.",
            "Desde joven, {N} sintió que no pertenecía completamente a {P}; su mirada siempre buscaba el horizonte.",
            "La historia de {N} comienza en el olvido, criado entre las ruinas de una era pasada en {P}."
        ],
        "Siul": [ // Universo 9 - Divino/Angelical
            "{N} despertó en los Jardines de Luz de {P}, arrullado por el canto de los Serafines caídos.",
            "Como descendiente de {R}, {N} fue instruido en las artes sagradas antes de que pudiera hablar.",
            "La luz de {P} quemó la inocencia de {N} muy pronto, revelándole la verdad sobre la Ascensión."
        ],
        "Umbra": [ // Universo Sombra
            "En la oscuridad perpetua de {P}, {N} aprendió a ver sin usar los ojos.",
            "{N} es un hijo de las sombras de {P}, moldeado por el silencio y el frío del vacío.",
            "Nacido del pacto entre una sombra y un mortal, {N} siempre ha caminado entre dos mundos en {P}."
        ],
        "Posidonia": [ // Universo Acuático
            "Las mareas de {P} cantaron el nombre de {N} antes de su nacimiento.",
            "Criado en las profundidades de corales de {P}, {N} respira y siente como el océano.",
            "{N} emergió de las aguas abisales de {P}, marcado por la presión de las profundidades."
        ],
        "Ignis": [ // Universo Fuego
            "{N} fue forjado en el calor de {P}, donde la debilidad se convierte en ceniza.",
            "La primera memoria de {N} es el fuego; en {P}, la vida es una llama constante.",
            "Entre los ríos de magma de {P}, {N} endureció su voluntad como el acero."
        ]
    },

    // 2. INCIDENTE INCITADOR (Basado en Rol Narrativo)
    incidents: {
        "Héroe": [
            "Todo cambió cuando la Sombra devoró su hogar, obligando a {N} a alzar un arma por primera vez.",
            "Un antiguo artefacto eligió a {N} como su portador, cargándolo con un destino que no pidió.",
            "{N} juró proteger a los inocentes tras presenciar una injusticia que nadie más se atrevió a detener.",
            "La llamada de la aventura sacó a {N} de su vida ordinaria para enfrentar un mal que despierta."
        ],
        "Villano": [
            "La traición de su mentor le enseñó a {N} que la lealtad es una cadena para los débiles.",
            "{N} descubrió que el poder prohibido era el único camino a la verdadera libertad, sin importar el costo.",
            "Tras ser desechado por la sociedad, {N} decidió que si no podía ser amado, sería temido.",
            "La visión de un orden perfecto obsesionó a {N}, dispuesto a quemar el caos del mundo para lograrlo."
        ],
        "AntiHéroe": [
            "{N} hace lo necesario, manchándose las manos de sangre para que otros puedan dormir tranquilos.",
            "Buscando redención por un pecado pasado, {N} camina en la delgada línea entre la luz y la oscuridad.",
            "Mercenario por necesidad, héroe por accidente; {N} solo obedece a su propio código.",
            "El sistema le falló a {N}, y ahora {N} opera fuera de la ley para encontrar su propia justicia."
        ],
        "Neutral": [
            "{N} observa el conflicto desde las sombras, interviniendo solo cuando el equilibrio peligra.",
            "Vagando por los mundos, {N} busca conocimiento y verdades olvidadas, ajeno a la guerra de la luz.",
            "La única lealtad de {N} es hacia sí mismo y su supervivencia en este universo roto.",
            "{N} es un testigo de la historia, registrando los ascensos y caídas sin tomar partido."
        ]
    },

    // 3. DESARROLLO / CONFLICTO (Basado en Metas/Deseos - simplificado a genérico por ahora)
    development: [
        "Ahora, guiado por {A}, {N} viaja buscando respuestas que podrían cambiar el destino del universo.",
        "Con la fuerza de {R}, {N} se enfrenta a pruebas que romperían a un ser inferior.",
        "Pero la sombra crece, y {N} debe decidir cuánto de su humanidad está dispuesto a sacrificar.",
        "En su camino, {N} ha descubierto que su verdadero enemigo podría ser él mismo."
    ],

    // 4. CLÍMAX / CIERRE (Generados dinámicamente o frases de impacto)
    climaxes: [
        "El destino de {P} pende de un hilo, y solo {N} puede cortarlo o atarlo de nuevo.",
        "Al final, {N} sabe que cada paso lo acerca a una confrontación inevitable con su pasado.",
        "La leyenda de {N} apenas comienza a escribirse en las estrellas.",
        "¿Será {N} el salvador que esperan, o el destructor que temen?"
    ]
};

// Función auxiliar para obtener plantillas (seguro para el navegador)
function getStoryTemplate(category, subkey) {
    if (!STORY_TEMPLATES[category]) return [];

    // Si la subclave existe, retornarla
    if (STORY_TEMPLATES[category][subkey]) return STORY_TEMPLATES[category][subkey];

    // Respaldo inteligente
    if (category === 'origins') return STORY_TEMPLATES.origins.generic;
    if (category === 'incidents') return STORY_TEMPLATES.incidents.Neutral; // Por defecto a neutral si falla rol

    return [];
}

if (typeof window !== 'undefined') {
    window.STORY_TEMPLATES = STORY_TEMPLATES;
    window.getStoryTemplate = getStoryTemplate;
}
if (typeof module !== 'undefined') {
    module.exports = { STORY_TEMPLATES, getStoryTemplate };
}

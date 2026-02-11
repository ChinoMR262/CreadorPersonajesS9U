/**
 * BASE DE DATOS DE PREGUNTAS DE CONVERGENCIA (TEST S9U)
 * 
 * Estructura de cada pregunta:
 * {
 *   id: string,               // Identificador único
 *   cond: {                   // Condiciones para que aparezca (Opcional)
 *     rol: string[],          // Roles permitidos (ej: ['Villano', 'Tirano'])
 *     mbti_group: string[],   // Grupos MBTI permitidos (ej: ['Analista'])
 *     tag: string[]           // Etiquetas requeridas (ej: ['Magia', 'Tecnología'])
 *   },
 *   q: string,                // Texto de la pregunta
 *   o: [                      // Opciones de respuesta
 *     { 
 *       txt: string,          // Texto de la opción
 *       score: {              // Puntuación dimensional (Sumatoria final define arquetipo)
 *          light: number,     // +Luz / -Oscuridad
 *          order: number,     // +Orden / -Caos
 *          psyche: number     // +Empatía / -Frialdad
 *       },
 *       traits: string[]      // Rasgos que se pueden añadir al personaje si se elige
 *     }
 *   ]
 * }
 */

const CONVERGENCE_QUESTIONS = [
    // --- PREGUNTAS GENERALES (FUNDAMENTALES) ---
    {
        id: "gen_01",
        q: "La Sombra comienza a devorar el sector donde vives. No hay escapatoria evidente.",
        o: [
            { txt: "Busco la fuente de la anomalía para destruirla.", score: { light: 1, order: 1, psyche: 0 }, traits: ["Valiente", "Determinado"] },
            { txt: "Analizo el patrón de consumo para encontrar una falla.", score: { light: 0, order: 2, psyche: -1 }, traits: ["Analítico", "Observador"] },
            { txt: "Evacuo a todos los que pueda antes de pensar en mí.", score: { light: 2, order: 0, psyche: 2 }, traits: ["Protector", "Altruista"] },
            { txt: "Me oculto y observo; sobrevivir es lo único que importa.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Superviviente", "Cauteloso"] }
        ]
    },
    {
        id: "gen_02",
        q: "Encuentras un artefacto de la Era Dorada que emana una energía inestable.",
        o: [
            { txt: "Lo utilizo para potenciar mis propias habilidades.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Ambicioso", "Audaz"] },
            { txt: "Lo estudio meticulosamente antes de tocarlo.", score: { light: 0, order: 2, psyche: 0 }, traits: ["Erudito", "Prudente"] },
            { txt: "Lo entrego a las autoridades o sabios locales.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Leal", "Ciudadano"] },
            { txt: "Lo destruyo. Nadie debería tener tanto poder.", score: { light: 0, order: 0, psyche: 1 }, traits: ["Desconfiado", "Justiciero"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS: VILLANOS ---
    {
        id: "vil_01",
        cond: { rol: ["Villano", "Tirano", "Monstruo", "Antagonista"] },
        q: "Tus enemigos claman piedad tras ser derrotados. ¿Cuál es tu sentencia?",
        o: [
            { txt: "Nadie merece piedad. Los elimino a todos.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Despiadado", "Cruel"] },
            { txt: "Los perdono si juran lealtad eterna a mí.", score: { light: -1, order: 2, psyche: -1 }, traits: ["Dominante", "Manipulador"] },
            { txt: "Los dejo vivir para que cuenten mi historia.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Arrogante", "Teatral"] },
            { txt: "Hago un ejemplo de su líder y libero al resto.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Calculador", "Terrorista"] }
        ]
    },
    {
        id: "vil_02",
        cond: { rol: ["Villano", "Tirano", "Monstruo"] },
        q: "El 'Héroe' se interpone en tu camino con un discurso sobre la justicia.",
        o: [
            { txt: "Me río de su ingenuidad antes de aplastarlo.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Cínico", "Poderoso"] },
            { txt: "Debato sus ideales para romper su espíritu.", score: { light: -1, order: 1, psyche: -2 }, traits: ["Intelectual", "Psicológico"] },
            { txt: "Lo ignoro. No es digno de mi tiempo.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Indiferente", "Superior"] },
            { txt: "Lo invito a unirse a mí. Tiene potencial.", score: { light: -1, order: 2, psyche: 0 }, traits: ["Visionario", "Seductor"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS: HÉROES ---
    {
        id: "her_01",
        cond: { rol: ["Héroe", "Paladín", "Guardián"] },
        q: "Debes sacrificar algo para salvar una ciudad. ¿Qué estás dispuesto a perder?",
        o: [
            { txt: "Mi vida, si es necesario.", score: { light: 3, order: 1, psyche: 2 }, traits: ["Mártir", "Valeroso"] },
            { txt: "Mi honor y mi reputación.", score: { light: 2, order: 0, psyche: 1 }, traits: ["Humilde", "Abnegado"] },
            { txt: "Mi humanidad, si el poder lo requiere.", score: { light: 1, order: -1, psyche: -1 }, traits: ["Trágico", "Determinado"] },
            { txt: "Buscaré una tercera opción. Siempre la hay.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Optimista", "Ingenioso"] }
        ]
    },
    // --- PREGUNTAS GRUPO MBTI: ANALISTAS (INTJ, INTP, ENTJ, ENTP) ---
    {
        id: "mbti_analista_01",
        cond: { mbti_group: ["Analista"] },
        q: "La estructura de la realidad parece tener un error lógico.",
        o: [
            { txt: "Dedico mi vida a descifrar el código subyacente.", score: { light: 0, order: 3, psyche: -1 }, traits: ["Obsesivo", "Científico"] },
            { txt: "Exploto el error para obtener ventaja.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Oportunista", "Hacker"] },
            { txt: "Teorizo sobre las implicaciones filosóficas.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Filósofo", "Abstracto"] },
            { txt: "Ignoro la teoría y me enfoco en lo práctico.", score: { light: 0, order: 1, psyche: 0 }, traits: ["Pragmático"] }
        ]
    },
    // --- PREGUNTAS GRUPO MBTI: DIPLOMÁTICOS (INFJ, INFP, ENFJ, ENFP) ---
    {
        id: "mbti_diplomatico_01",
        cond: { mbti_group: ["Diplomático"] },
        q: "Sientes una resonancia emocional proveniente de un ser enemigo.",
        o: [
            { txt: "Intento comunicarme telepáticamente.", score: { light: 2, order: 0, psyche: 3 }, traits: ["Empático", "Telepático"] },
            { txt: "Dudo en atacar, sintiendo su dolor.", score: { light: 1, order: 0, psyche: 2 }, traits: ["Compasivo", "Vacilante"] },
            { txt: "Uso esa conexión para manipularlo.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Manipulador Emocional"] },
            { txt: "Bloqueo la emoción para cumplir mi deber.", score: { light: 0, order: 1, psyche: -1 }, traits: ["Profesional", "Estoico"] }
        ]
    },
    // --- LORE DEEP: EL NOVENO UNIVERSO ---
    {
        id: "lore_01",
        q: "¿Qué opinas de la Ascensión de los Serafines?",
        o: [
            { txt: "Fue un acto de arrogancia necesaria.", score: { light: -1, order: 1, psyche: 0 }, traits: ["Crítico"] },
            { txt: "Es la prueba de que podemos tocar lo divino.", score: { light: 2, order: 0, psyche: 2 }, traits: ["Creyente"] },
            { txt: "Solo trajo caos y destrucción.", score: { light: 0, order: -1, psyche: -1 }, traits: ["Pesimista"] },
            { txt: "Es historia antigua, importa el ahora.", score: { light: 0, order: 0, psyche: 0 }, traits: ["Realista"] }
        ]
    },
    {
        id: "lore_02",
        q: "Kairon representa la energía pura sin conciencia. Si fueras su avatar:",
        o: [
            { txt: "Impondría mi voluntad sobre la energía.", score: { light: 0, order: 2, psyche: -1 }, traits: ["Controlador"] },
            { txt: "Me dejaría llevar por el flujo eterno.", score: { light: 1, order: -2, psyche: 1 }, traits: ["Fluído", "Caótico"] },
            { txt: "Usaría el poder para proteger a los débiles.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Noble"] },
            { txt: "Quemaría todo para empezar de nuevo.", score: { light: -2, order: -3, psyche: -2 }, traits: ["Destructor"] }
        ]
    }
];

if (typeof window !== 'undefined') window.CONVERGENCE_QUESTIONS = CONVERGENCE_QUESTIONS;
if (typeof module !== 'undefined') module.exports = CONVERGENCE_QUESTIONS;

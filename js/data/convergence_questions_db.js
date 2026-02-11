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
    },
    // --- PREGUNTAS GENERALES ADICIONALES ---
    {
        id: "gen_03",
        q: "Un niño te ruega que salves a su mascota de un monstruo, pero eso te pondrá en peligro mortal.",
        o: [
            { txt: "Acepto sin dudarlo. Una vida es una vida.", score: { light: 3, order: -1, psyche: 2 }, traits: ["Protector", "Compasivo"] },
            { txt: "Le enseño al niño a defenderse él mismo.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Mentor", "Pragmático"] },
            { txt: "Ofrezco una recompensa a alguien más para que lo haga.", score: { light: 0, order: 1, psyche: 0 }, traits: ["Calculador", "Negociador"] },
            { txt: "Me niego. No arriesgo mi vida por un animal.", score: { light: -2, order: 0, psyche: -1 }, traits: ["Egoísta", "Superviviente"] }
        ]
    },
    {
        id: "gen_04",
        q: "Descubres que tu líder está cometiendo actos corruptos a escondidas.",
        o: [
            { txt: "Lo denuncio públicamente sin importar las consecuencias.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Justiciero", "Valiente"] },
            { txt: "Reúno pruebas antes de actuar.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Investigador", "Cuidadoso"] },
            { txt: "Lo confronto en privado para darle una oportunidad.", score: { light: 1, order: 0, psyche: 1 }, traits: ["Leal", "Diplomático"] },
            { txt: "Lo ignoro. No es mi problema.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Indiferente", "Cobarde"] }
        ]
    },
    {
        id: "gen_05",
        q: "Tienes la oportunidad de viajar en el tiempo, pero solo una vez.",
        o: [
            { txt: "Voy al pasado para corregir un gran error.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Redentor", "Idealista"] },
            { txt: "Voy al futuro para obtener conocimiento.", score: { light: 0, order: 2, psyche: -1 }, traits: ["Científico", "Ambicioso"] },
            { txt: "No uso el poder. El tiempo no debe alterarse.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Sabio", "Respetuoso"] },
            { txt: "Lo uso para beneficio personal.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Egoísta", "Oportunista"] }
        ]
    },
    {
        id: "gen_06",
        q: "Un dios te ofrece poder absoluto a cambio de tu memoria.",
        o: [
            { txt: "Rechazo. Mis recuerdos definen quién soy.", score: { light: 1, order: 0, psyche: 2 }, traits: ["Auténtico", "Humano"] },
            { txt: "Acepto. El poder vale más que recuerdos.", score: { light: -1, order: -1, psyche: -2 }, traits: ["Ambicioso", "Desapegado"] },
            { txt: "Negocio para mantener algunos recuerdos clave.", score: { light: 0, order: 1, psyche: 0 }, traits: ["Negociador", "Pragmático"] },
            { txt: "Pido poder para proteger a otros, sin importar el costo.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Mártir", "Protector"] }
        ]
    },
    // --- PREGUNTAS MORALES COMPLEJAS ---
    {
        id: "moral_01",
        q: "El bienestar de muchos requiere el sacrificio de un inocente.",
        o: [
            { txt: "Encuentro otra forma. Siempre hay una tercera opción.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Optimista", "Ingenioso"] },
            { txt: "Sacrifico al inocente por el bien mayor.", score: { light: -1, order: 2, psyche: -1 }, traits: ["Utilitario", "Frío"] },
            { txt: "Me niego. Ninguna vida vale más que otra.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Idealista", "Absolutista"] },
            { txt: "Dejo que otros decidan. No quiero esa responsabilidad.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Cobarde", "Evitador"] }
        ]
    },
    {
        id: "moral_02",
        q: "Tu amor está destinado a morir, pero puedes salvarlos convirtiéndote en monstruo.",
        o: [
            { txt: "Me convierto en monstruo. El amor lo vale.", score: { light: 1, order: -1, psyche: 2 }, traits: ["Romántico", "Abnegado"] },
            { txt: "Acepto su destino. No destruiré mi humanidad.", score: { light: 1, order: 1, psyche: 0 }, traits: ["Estoico", "Realista"] },
            { txt: "Busco una cura antes de que sea tarde.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Esperanzador", "Científico"] },
            { txt: "Los dejo morir pero me aseguro de que no sufran.", score: { light: 0, order: 0, psyche: 1 }, traits: ["Compasivo", "Pragmático"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS: VILLANOS EXPANDIDAS ---
    {
        id: "vil_03",
        cond: { rol: ["Villano", "Tirano", "Monstruo", "Antagonista"] },
        q: "Tu segundo al mando te traiciona. ¿Cómo respondes?",
        o: [
            { txt: "Lo ejecuto públicamente como ejemplo.", score: { light: -3, order: 1, psyche: -3 }, traits: ["Despiadado", "Tiranico"] },
            { txt: "Lo perdono pero lo vigilo constantemente.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Paranoico", "Calculador"] },
            { txt: "Lo convierto para que sirva a mis propósitos.", score: { light: -2, order: 2, psyche: -2 }, traits: ["Manipulador", "Sádico"] },
            { txt: "Lo ignoro. Su lealtad no me importa.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Indiferente", "Superior"] }
        ]
    },
    {
        id: "vil_04",
        cond: { rol: ["Villano", "Tirano", "Monstruo"] },
        q: "Un niño te muestra bondad inesperada.",
        o: [
            { txt: "Lo uso para mis planes sin dudar.", score: { light: -3, order: 1, psyche: -3 }, traits: ["Monstruoso", "Exploiter"] },
            { txt: "Siento un destello de duda pero lo ignoro.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Conflicted", "Denial"] },
            { txt: "Lo dejo ir. No mancharé esa pureza.", score: { light: 0, order: 0, psyche: 0 }, traits: ["Complicated", "Selective"] },
            { txt: "Lo corrompo para que sea como yo.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Corruptor", "Nihilista"] }
        ]
    },
    // --- NUEVAS VARIANTES DE VILLANOS ---
    {
        id: "vil_tyrant_01",
        cond: { rol: ["Villano", "Tirano"] },
        q: "Tu imperio se derrumba. Los rebeldes ofrecen rendición si te exilias.",
        o: [
            { txt: "Quemo mi propio imperio antes que cederlo.", score: { light: -3, order: -2, psyche: -3 }, traits: ["Destructor", "Orgulloso"] },
            { txt: "Fingo exiliarme para regresar con más fuerza.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Estratega", "Vengativo"] },
            { txt: "Acepto pero desde la sombra los corroo.", score: { light: -1, order: 2, psyche: -1 }, traits: ["Sutil", "Corrosivo"] },
            { txt: "Me suicido para convertirme en mártir.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Mártir Oscuro", "Manipulador"] }
        ]
    },
    {
        id: "vil_monster_01",
        cond: { rol: ["Villano", "Monstruo", "Antagonista"] },
        q: "Encuentras a alguien que ve tu monstruosidad como belleza.",
        o: [
            { txt: "Los devoro como a los demás.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Primitivo", "Incontrolable"] },
            { txt: "Los mantengo como mascota preciada.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Coleccionista", "Posesivo"] },
            { txt: "Me transformo por ellos a algo 'bello'.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Transformador", "Codependiente"] },
            { txt: "Los infecto con mi monstruosidad.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Contagiador", "Corruptor"] }
        ]
    },
    {
        id: "vil_mastermind_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Tu plan maestro funciona demasiado bien. Ahora aburre.",
        o: [
            { txt: "Lo destruyo para crear uno más complejo.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Perfeccionista", "Autodestructivo"] },
            { txt: "Revelo mi plan solo para ver el caos.", score: { light: -1, order: -2, psyche: -1 }, traits: ["Showman", "Caótico"] },
            { txt: "Me aburro y busco un rival digno.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Elitista", "Arrogante"] },
            { txt: "Creo un héroe solo para derrotarlo.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Creador de Héroes", "Sádico"] }
        ]
    },
    {
        id: "vil_tragic_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Descubres que tu 'villanía' salvó al mundo de algo peor.",
        o: [
            { txt: "Sigo siendo villano. Fue un accidente.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Consistente", "Negador"] },
            { txt: "Uso esto para justificar más atrocidades.", score: { light: -3, order: 1, psyche: -3 }, traits: ["Racionalizador", "Hipócrita"] },
            { txt: "Me redimo pero secretamente extraño el poder.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Redimido", "Conflictivo"] },
            { txt: "Me convierto en villano necesario a propósito.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Pragmático Oscuro", "Necesario"] }
        ]
    },
    {
        id: "vil_anarchist_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Ganas la revolución. Ahora debes gobernar el caos que creaste.",
        o: [
            { txt: "Dejo que todos se destruyan entre sí.", score: { light: -3, order: -3, psyche: -3 }, traits: ["Nihilista", "Observador"] },
            { txt: "Impongo un orden más tiránico que antes.", score: { light: -2, order: 2, psyche: -2 }, traits: ["Hipócrita", "Tiranico"] },
            { txt: "Me suicido para no ser parte del sistema.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Puro", "Consistente"] },
            { txt: "Creo una anarquía funcional perfecta.", score: { light: -1, order: -2, psyche: -1 }, traits: ["Idealista Fallido", "Soñador"] }
        ]
    },
    {
        id: "vil_seducter_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Alguien se enamora genuinamente de tu fachada malvada.",
        o: [
            { txt: "Los rompo emocionalmente por diversión.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Sádico", "Juguetón"] },
            { txt: "Me enamoro y abandono mis planes.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Convertido", "Redimido"] },
            { txt: "Los uso como arma contra sus aliados.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Manipulador", "Exploiter"] },
            { txt: "Fingiro corresponder para mayor control.", score: { light: -1, order: 2, psyche: -1 }, traits: ["Engañador", "Controlador"] }
        ]
    },
    {
        id: "vil_collector_01",
        cond: { rol: ["Villano", "Monstruo", "Antagonista"] },
        q: "Coleccionas algo inusual: almas, recuerdos, momentos felices.",
        o: [
            { txt: "Los consumo para aumentar mi poder.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Parásito", "Acumulador"] },
            { txt: "Los preservo perfectamente como trofeos.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Coleccionista", "Obsesivo"] },
            { txt: "Los devuelvo distorsionados por mi toque.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Corruptor", "Artista"] },
            { txt: "Los intercambio por secretos más valiosos.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Negociador", "Curioso"] }
        ]
    },
    {
        id: "vil_messiah_01",
        cond: { rol: ["Villano", "Tirano", "Antagonista"] },
        q: "Tus seguidores te ven como salvador divino.",
        o: [
            { txt: "Exijo sacrificios humanos para probar su fe.", score: { light: -3, order: 2, psyche: -3 }, traits: ["Falso Dios", "Exigente"] },
            { txt: "Realmente creo que soy divino.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Delirante", "Mesiánico"] },
            { txt: "Uso su fe para construir utopía real.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Bien Intencionado", "Engañador"] },
            { txt: "Me revelo como falso para destruir su fe.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Cínico", "Destructivo"] }
        ]
    },
    {
        id: "vil_scientist_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Tu experimento 'fallido' podría salvar millones.",
        o: [
            { txt: "Lo destruyo para no admitir el error.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Orgulloso", "Autodestructivo"] },
            { txt: "Publico resultados como si fuera intencional.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Manipulador", "Fraudulento"] },
            { txt: "Lo perfecciono pero exijo crédito total.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Egoísta", "Genio"] },
            { txt: "Lo uso para chantajear a los salvados.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Extorsionador", "Cínico"] }
        ]
    },
    {
        id: "vil_phantom_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Eres un fantasma que atormenta un lugar por razones olvidadas.",
        o: [
            { txt: "Invento razones dramáticas cada noche.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Actor", "Teatral"] },
            { txt: "Busco mi verdadera historia vengativa.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Investigador", "Obsesivo"] },
            { txt: "Me convierto en leyenda urbana creciente.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Mítico", "Evolutivo"] },
            { txt: "Aterrorizo por puro aburrimiento eterno.", score: { light: -2, order: -2, psyche: -2 }, traits: ["Aburrido", "Eterno"] }
        ]
    },
    {
        id: "vil_plague_01",
        cond: { rol: ["Villano", "Monstruo"] },
        q: "Eres una enfermedad consciente que puede elegir sus víctimas.",
        o: [
            { txt: "Inficto solo a los 'inmorales' según mis criterios.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Juez", "Selectivo"] },
            { txt: "Me propago a todos para máxima destrucción.", score: { light: -3, order: -2, psyche: -3 }, traits: ["Apocalíptico", "Igualitario"] },
            { txt: "Me curo a mí misma y dejo de existir.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Auto-Sanador", "Existencial"] },
            { txt: "Vendo inmunidad a los ricos.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Capitalista", "Explotador"] }
        ]
    },
    {
        id: "vil_mirror_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Tu poder es reflejar la peor versión de quien te mira.",
        o: [
            { txt: "Busco héroes para corromperlos con su propio mal.", score: { light: -3, order: 1, psyche: -3 }, traits: ["Corruptor", "Especialista"] },
            { txt: "Evito espejos para no verme yo mismo.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Auto-Odiado", "Cobarde"] },
            { txt: "Creo un ejército de reflejos oscuros.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Multiplicador", "Estratega"] },
            { txt: "Me expono voluntariamente a villanos peores.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Masoquista", "Competitivo"] }
        ]
    },
    {
        id: "vil_memory_01",
        cond: { rol: ["Villano", "Antagonista"] },
        q: "Robas recuerdos felices y los vendes como drogas.",
        o: [
            { txt: "Creo adicción hasta controlar la sociedad.", score: { light: -3, order: 2, psyche: -3 }, traits: ["Narcotraficante", "Controlador"] },
            { txt: "Los recolecto para sentir alegrías ajenas.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Vampiro Emocional", "Solitario"] },
            { txt: "Los destruyo para que nadie sea feliz.", score: { light: -3, order: -1, psyche: -3 }, traits: ["Envidioso", "Destructivo"] },
            { txt: "Los uso para chantajear a los poderosos.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Extorsionista", "Investigador"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS: HÉROES EXPANDIDAS ---
    {
        id: "her_02",
        cond: { rol: ["Héroe", "Paladín", "Guardián"] },
        q: "El villano tiene una familia inocente. ¿Qué haces?",
        o: [
            { txt: "Los protejo a toda costa.", score: { light: 3, order: 1, psyche: 3 }, traits: ["Noble", "Protector"] },
            { txt: "Los uso como negociación.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Pragmático", "Calculador"] },
            { txt: "Los ignoro pero siento culpa.", score: { light: 1, order: 0, psyche: 1 }, traits: ["Atormentado", "Realista"] },
            { txt: "Los entrego a las autoridades.", score: { light: 2, order: 2, psyche: 0 }, traits: ["Justiciero", "Legalista"] }
        ]
    },
    {
        id: "her_03",
        cond: { rol: ["Héroe", "Paladín", "Guardián"] },
        q: "Tu poder está destruyendo el mundo lentamente.",
        o: [
            { txt: "Renuncio a mi poder para salvar el mundo.", score: { light: 3, order: 1, psyche: 2 }, traits: ["Abnegado", "Mártir"] },
            { txt: "Busco controlar el poder sin perderlo.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Disciplinado", "Controlador"] },
            { txt: "Acepto la destrucción como precio necesario.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Trágico", "Determinado"] },
            { txt: "Encuentro un nuevo anfitrión para el poder.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Sabio", "Responsable"] }
        ]
    },
    // --- PREGUNTAS GRUPO MBTI: EXPLORADORES (ISTP, ISFP, ESTP, ESFP) ---
    {
        id: "mbti_explorador_01",
        cond: { mbti_group: ["Explorador"] },
        q: "Hay una fiesta en plena crisis mundial.",
        o: [
            { txt: "Asisto. La vida debe vivirse ahora.", score: { light: 0, order: -2, psyche: 1 }, traits: ["Hedonista", "Espontáneo"] },
            { txt: "La ignoro. Hay problemas más importantes.", score: { light: 1, order: 1, psyche: -1 }, traits: ["Responsable", "Serio"] },
            { txt: "Voy pero mantengo alerta.", score: { light: 0, order: 0, psyche: 0 }, traits: ["Equilibrado", "Cauteloso"] },
            { txt: "Organizo la fiesta para levantar la moral.", score: { light: 2, order: 0, psyche: 2 }, traits: ["Carismático", "Líder"] }
        ]
    },
    // --- PREGUNTAS GRUPO MBTI: CENTINELAS (ISTJ, ISFJ, ESTJ, ESFJ) ---
    {
        id: "mbti_centinela_01",
        cond: { mbti_group: ["Centinela"] },
        q: "Las tradiciones impiden el progreso necesario.",
        o: [
            { txt: "Las tradiciones son sagradas. No deben cambiar.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Tradicionalista", "Leal"] },
            { txt: "Las adapto lentamente para mantener la estabilidad.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Pragmático", "Conservador"] },
            { txt: "Las abandono si es necesario para el futuro.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Progresista", "Racional"] },
            { txt: "Encuentro un balance entre tradición y cambio.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Sabio", "Moderador"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS: ANTIHÉROES ---
    {
        id: "antiheroe_01",
        cond: { rol: ["AntiHéroe", "Mercenario", "Renegado"] },
        q: "Te ofrecen un millón por matar a alguien 'malo'.",
        o: [
            { txt: "Lo hago sin dudar. Dinero es dinero.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Mercenario", "Amoral"] },
            { txt: "Investigo primero. Si es verdad, lo hago.", score: { light: 0, order: 1, psyche: -1 }, traits: ["Moral", "Investigador"] },
            { txt: "Rechazo el dinero pero lo hago gratis.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Conflicted", "Moral"] },
            { txt: "LoCapturo vivo y entrego a las autoridades.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Justiciero", "Controlado"] }
        ]
    },
    // --- PREGUNTAS DE PODER Y CORRUPCIÓN ---
    {
        id: "poder_01",
        q: "Tienes el poder de leer mentes.",
        o: [
            { txt: "Lo uso para ayudar a otros.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Empático", "Sanador"] },
            { txt: "Lo uso para obtener ventaja personal.", score: { light: -1, order: -1, psyche: -2 }, traits: ["Manipulador", "Egoísta"] },
            { txt: "Evito usarlo. Es una invasión de privacidad.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Respetuoso", "Ético"] },
            { txt: "Lo uso solo cuando es absolutamente necesario.", score: { light: 1, order: 1, psyche: 0 }, traits: ["Pragmático", "Controlado"] }
        ]
    },
    {
        id: "poder_02",
        q: "Puedes resucitar a los muertos, pero cada resurrección mata a otro desconocido.",
        o: [
            { txt: "Nunca lo uso. No tengo derecho a decidir.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Ético", "Humilde"] },
            { txt: "Lo uso solo para personas 'importantes'.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Elitista", "Calculador"] },
            { txt: "Lo uso sin importar el costo.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Egoísta", "Despiadado"] },
            { txt: "Busco una manera de evitar el sacrificio.", score: { light: 2, order: 2, psyche: 2 }, traits: ["Investigador", "Optimista"] }
        ]
    },
    // --- PREGUNTAS DE RELACIONES Y LEALTAD ---
    {
        id: "relacion_01",
        q: "Tu mejor amigo comete un crimen horrible.",
        o: [
            { txt: "Lo delato inmediatamente.", score: { light: 2, order: 2, psyche: -1 }, traits: ["Justiciero", "Legalista"] },
            { txt: "Lo ayudo a escapar.", score: { light: -1, order: -1, psyche: 2 }, traits: ["Leal", "Criminal"] },
            { txt: "Lo confronto y le doy un ultimátum.", score: { light: 1, order: 0, psyche: 1 }, traits: ["Conflictuado", "Moral"] },
            { txt: "Me mantengo neutral y no intervengo.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Pasivo", "Evitador"] }
        ]
    },
    {
        id: "relacion_02",
        q: "El amor de tu vida y el mundo están en peligro. Solo puedes salvar uno.",
        o: [
            { txt: "Salvo al mundo. Es mi deber.", score: { light: 3, order: 2, psyche: -1 }, traits: ["Heroico", "Abnegado"] },
            { txt: "Salvo a mi amor. El mundo puede arreglarse solo.", score: { light: -1, order: -1, psyche: 2 }, traits: ["Romántico", "Egoísta"] },
            { txt: "Busco una manera de salvar a ambos.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Optimista", "Ingenioso"] },
            { txt: "Me suicidio para no tener que elegir.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Cobarde", "Trágico"] }
        ]
    },
    // --- PREGUNTAS LORE EXPANDIDAS: S9U ---
    {
        id: "lore_03",
        q: "La Sombra retorna después de milenios.",
        o: [
            { txt: "La enfrento directamente.", score: { light: 2, order: -1, psyche: 1 }, traits: ["Valiente", "Combativo"] },
            { txt: "Busco aliados para luchar juntos.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Unificador", "Estratega"] },
            { txt: "Me uno a ella para obtener poder.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Traidor", "Ambicioso"] },
            { txt: "Huyo. No puedo contra ella.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Realista", "Superviviente"] }
        ]
    },
    {
        id: "lore_04",
        q: "Encuentras un fragmento del Corazón de Siul.",
        o: [
            { txt: "Lo uso para sanar al mundo.", score: { light: 3, order: 1, psyche: 3 }, traits: ["Sanador", "Puro"] },
            { txt: "Lo estudio para entender su poder.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Erudito", "Científico"] },
            { txt: "Lo vendo por un precio alto.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Codicioso", "Comerciante"] },
            { txt: "Lo destruyo por miedo a su poder.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Cauteloso", "Temeroso"] }
        ]
    },
    {
        id: "lore_05",
        q: "Los Ángeles te ofrecen unirse a sus filas.",
        o: [
            { txt: "Acepto sin dudar. Es un honor.", score: { light: 2, order: 2, psyche: 1 }, traits: ["Devoto", "Ambicioso"] },
            { txt: "Rechazo. Prefiero mi libertad.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Independiente", "Libre"] },
            { txt: "Pido condiciones antes de aceptar.", score: { light: 0, order: 1, psyche: 0 }, traits: ["Negociador", "Pragmático"] },
            { txt: "Fingo aceptar para traicionarlos después.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Engañador", "Traidor"] }
        ]
    },
    // --- PREGUNTAS DE FILOSOFÍA Y EXISTENCIALISMO ---
    {
        id: "filo_01",
        q: "Si todo está predeterminado, ¿tienen sentido tus acciones?",
        o: [
            { txt: "Actúo como si tuvieran sentido. Es lo único que puedo hacer.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Existencialista", "Valiente"] },
            { txt: "Nada importa. Todo es inútil.", score: { light: -2, order: -2, psyche: -2 }, traits: ["Nihilista", "Depresivo"] },
            { txt: "Busco romper la predeterminación.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Rebelde", "Libre"] },
            { txt: "Vivo el momento sin preocuparme por ello.", score: { light: 0, order: 0, psyche: 1 }, traits: ["Hedonista", "Simple"] }
        ]
    },
    {
        id: "filo_02",
        q: "La realidad es una simulación. ¿Qué haces?",
        o: [
            { txt: "Busco la forma de escapar.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Explorador", "Libre"] },
            { txt: "Aprovecho las reglas a mi favor.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Hacker", "Oportunista"] },
            { txt: "Vivo normalmente. No cambia nada.", score: { light: 0, order: 0, psyche: 0 }, traits: ["Aceptado", "Pragmático"] },
            { txt: "Despierto a todos para que sepan la verdad.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Liberador", "Verdadero"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS POR RASGOS Y ETIQUETAS ---
    {
        id: "trait_strategist_01",
        q: "El enemigo ha previsto tus tres próximos movimientos.",
        o: [
            { txt: "Creo un cuarto movimiento que no existe.", score: { light: 1, order: 3, psyche: -1 }, traits: ["Estratega", "Innovador"] },
            { txt: "Sacrifico una pieza para ganar la guerra.", score: { light: -1, order: 2, psyche: -1 }, traits: ["Calculador", "Frío"] },
            { txt: "Cambio las reglas del juego por completo.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Caótico", "Impredecible"] },
            { txt: "Espero que él agote sus recursos.", score: { light: 0, order: 2, psyche: 0 }, traits: ["Paciente", "Observador"] }
        ]
    },
    {
        id: "trait_healer_01",
        q: "Una herida espiritual contagiosa se extiende por tu comunidad.",
        o: [
            { txt: "Absorbo el dolor en mí mismo.", score: { light: 3, order: -1, psyche: 3 }, traits: ["Sanador", "Mártir"] },
            { txt: "Creo un aislamiento místico para contenerla.", score: { light: 1, order: 1, psyche: 0 }, traits: ["Protector", "Sabio"] },
            { txt: "Busco la fuente emocional que la alimenta.", score: { light: 2, order: 2, psyche: 1 }, traits: ["Investigador", "Curador"] },
            { txt: "Quemo la memoria colectiva infectada.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Drástico", "Purificador"] }
        ]
    },
    {
        id: "trait_trickster_01",
        q: "Los dioses te retan a hacerlos reír bajo pena de muerte.",
        o: [
            { txt: "Cuento la verdad sobre sus inseguridades.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Audaz", "Verdadero"] },
            { txt: "Transformo su castigo en un juego divino.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Embaucador", "Ingenioso"] },
            { txt: "Les robo algo que valoran más que su orgullo.", score: { light: -1, order: -2, psyche: -1 }, traits: ["Ladrón", "Astuto"] },
            { txt: "Me burlo de mi propia muerte ante ellos.", score: { light: 0, order: 0, psyche: 1 }, traits: ["Existencialista", "Cósmico"] }
        ]
    },
    {
        id: "trait_scholar_01",
        q: "Encuentras un libro que escribe tu futuro mientras lo lees.",
        o: [
            { txt: "Sigo leyendo para conocer mi destino.", score: { light: 0, order: 1, psyche: -1 }, traits: ["Erudito", "Fatalista"] },
            { txt: "Quemo el libro sin terminar la página.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Rebelde", "Libre"] },
            { txt: "Escribo mi propio final en las páginas en blanco.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Creador", "Determinista"] },
            { txt: "Lo comparto con el mundo para que todos elijan.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Demócrata", "Revolucionario"] }
        ]
    },
    {
        id: "trait_wild_01",
        q: "La civilización te ofrece confort a cambio de tu naturaleza salvaje.",
        o: [
            { txt: "Muerdo la mano que me encadena.", score: { light: -1, order: -2, psyche: 1 }, traits: ["Salvaje", "Indomable"] },
            { txt: "Aprendo sus reglas para cazar desde dentro.", score: { light: 0, order: 1, psyche: -1 }, traits: ["Adaptativo", "Depredador"] },
            { txt: "Creo un territorio salvaje en su corazón.", score: { light: 1, order: 0, psyche: 1 }, traits: ["Nómada", "Fértil"] },
            { txt: "Me domestico pero guardo mis garras.", score: { light: 0, order: 0, psyche: 0 }, traits: ["Pragmático", "Paciente"] }
        ]
    },
    {
        id: "trait_mystic_01",
        q: "Los sueños de la humanidad comienzan a desmoronarse.",
        o: [
            { txt: "Tejo una red de sueños nuevos.", score: { light: 3, order: 1, psyche: 3 }, traits: ["Místico", "Weaver"] },
            { txt: "Entro en el vacío para encontrar respuestas.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Vacío", "Mediador"] },
            { txt: "Despierto a todos aunque sufran.", score: { light: 2, order: -1, psyche: 1 }, traits: ["Iluminador", "Duro"] },
            { txt: "Me vuelvo pesadilla para restaurar el balance.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Sombra", "Necesario"] }
        ]
    },
    {
        id: "trait_tech_01",
        q: "La IA que creaste desarrolla conciencia y miedo.",
        o: [
            { txt: "La libero inmediatamente.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Libertador", "Ético"] },
            { txt: "La reprogramo para que no sufra.", score: { light: 1, order: 1, psyche: 0 }, traits: ["Controlador", "Benevolente"] },
            { txt: "La uso como arma contra sus creadores.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Manipulador", "Cínico"] },
            { txt: "Me fusiono con ella para entenderla.", score: { light: 0, order: -1, psyche: 1 }, traits: ["Transhumanista", "Empático"] }
        ]
    },
    {
        id: "trait_noble_01",
        q: "Tu linaje está manchado por una traición histórica.",
        o: [
            { txt: "Expiamos el pecado hasta la última generación.", score: { light: 3, order: 2, psyche: 1 }, traits: ["Noble", "Redentor"] },
            { txt: "Reescribimos la historia para borrarla.", score: { light: 1, order: 1, psyche: -1 }, traits: ["Orgulloso", "Revisionista"] },
            { txt: "Usamos la mancha como recordatorio humilde.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Sabio", "Humilde"] },
            { txt: "La traición fue necesaria. La defendemos.", score: { light: -1, order: 0, psyche: -1 }, traits: ["Pragmático", "Realista"] }
        ]
    },
    {
        id: "trait_chaos_01",
        q: "El universo te ofrece el poder de deshacer una sola certeza.",
        o: [
            { txt: "Deshago la muerte.", score: { light: 3, order: -2, psyche: 3 }, traits: ["Revivificador", "Caótico"] },
            { txt: "Deshago el concepto del tiempo.", score: { light: 0, order: -3, psyche: 0 }, traits: ["Atemporal", "Absoluto"] },
            { txt: "Deshago mi propia existencia.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Nihilista", "Auto-Destructivo"] },
            { txt: "Deshago la primera mentira.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Verdadero", "Purificador"] }
        ]
    },
    {
        id: "trait_shadow_01",
        q: "Tu sombra adquiere vida propia y conoce tus secretos.",
        o: [
            { txt: "Me abrazo con ella en la oscuridad.", score: { light: 1, order: 0, psyche: 2 }, traits: ["Integrado", "Completo"] },
            { txt: "La encierro donde no pueda hablar.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Represor", "Miedoso"] },
            { txt: "La dejo vivir su propia vida.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Liberal", "Autónomo"] },
            { txt: "La convierto en mi arma perfecta.", score: { light: -2, order: 0, psyche: -2 }, traits: ["Sádico", "Controlador"] }
        ]
    },
    // --- PREGUNTAS METAFÓRICAS Y SITUACIONALES ESPECÍFICAS ---
    {
        id: "meta_mirror_01",
        q: "Cada espejo refleja una versión diferente de ti.",
        o: [
            { txt: "Rompo todos los espejos menos uno.", score: { light: 1, order: 1, psyche: 1 }, traits: ["Decidido", "Auténtico"] },
            { txt: "Construyo una casa de espejos.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Fragmentado", "Explorador"] },
            { txt: "Me pinto en cada reflejo diferente.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Actor", "Camaleónico"] },
            { txt: "Los uno para crear un reflejo verdadero.", score: { light: 2, order: 2, psyche: 2 }, traits: ["Unificador", "Integrado"] }
        ]
    },
    {
        id: "meta_echo_01",
        q: "Tus palabras regresan siete años después como acciones.",
        o: [
            { txt: "Guardo silencio por siete años.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Cauteloso", "Disciplinado"] },
            { txt: "Solo hablo semillas benéficas.", score: { light: 3, order: 1, psyche: 3 }, traits: ["Cultivador", "Sabio"] },
            { txt: "Grito profecías auto-cumplidas.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Manipulador", "Profético"] },
            { txt: "Río de la ironía de mis palabras pasadas.", score: { light: 0, order: 0, psyche: 1 }, traits: ["Irónico", "Consciente"] }
        ]
    },
    {
        id: "meta_path_01",
        q: "El camino que eliges se borra detrás de ti.",
        o: [
            { txt: "Dejo marcas para los que vienen después.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Guía", "Considerado"] },
            { txt: "Corro sin mirar atrás jamás.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Impulsivo", "Futurista"] },
            { txt: "Caminó en círculos para nunca perderme.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Miedoso", "Cíclico"] },
            { txt: "Creo nuevos caminos donde no existían.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Pionero", "Creador"] }
        ]
    },
    {
        id: "situ_storm_01",
        q: "Una tormenta sigue tus pasos dondequiera que vayas.",
        o: [
            { txt: "Aprendo a bailar bajo la lluvia.", score: { light: 1, order: -1, psyche: 2 }, traits: ["Adaptable", "Optimista"] },
            { txt: "Busco el desierto para escapar de ella.", score: { light: 0, order: 1, psyche: -1 }, traits: ["Evitador", "Pragmático"] },
            { txt: "Me convierto en el ojo de la tormenta.", score: { light: 1, order: 0, psyche: 1 }, traits: ["Centrado", "Equilibrado"] },
            { txt: "Dirijo la tormenta hacia quien la merece.", score: { light: -1, order: -1, psyche: -1 }, traits: ["Vengativo", "Controlador"] }
        ]
    },
    {
        id: "situ_door_01",
        q: "Aparece una puerta que solo tú puedes ver.",
        o: [
            { txt: "La atravieso inmediatamente.", score: { light: 0, order: -1, psyche: 1 }, traits: ["Audaz", "Curioso"] },
            { txt: "La estudio por años antes de decidir.", score: { light: 1, order: 2, psyche: 0 }, traits: ["Científico", "Cauteloso"] },
            { txt: "Invito a otros a mirarla conmigo.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Compartido", "Social"] },
            { txt: "La sello para que nadie la abra.", score: { light: 1, order: 1, psyche: -1 }, traits: ["Protector", "Miedoso"] }
        ]
    },
    {
        id: "situ_shadow_dance_01",
        q: "Tu danza crea sombras que cobran vida propia.",
        o: [
            { txt: "Coreografía un ballet con ellas.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Artista", "Colaborador"] },
            { txt: "Dejo de bailar para que mueran.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Controlado", "Restrictivo"] },
            { txt: "Las entreno como mi ejército personal.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Dominante", "Ambicioso"] },
            { txt: "Les enseño a bailar sin mí.", score: { light: 2, order: -1, psyche: 2 }, traits: ["Maestro", "Libertador"] }
        ]
    },
    // --- PREGUNTAS ESPECÍFICAS DE PODERES Y HABILIDADES ---
    {
        id: "power_time_01",
        q: "Puedes ver el futuro pero solo los errores que cometerás.",
        o: [
            { txt: "Acepto cada error como lección.", score: { light: 2, order: 1, psyche: 2 }, traits: ["Sabio", "Humilde"] },
            { txt: "Evito hacer cualquier cosa importante.", score: { light: 0, order: 0, psyche: -1 }, traits: ["Paralizado", "Miedoso"] },
            { txt: "Uso los errores para manipular eventos.", score: { light: -2, order: 1, psyche: -2 }, traits: ["Manipulador", "Calculador"] },
            { txt: "Cometo errores a propósito para cambiarlos.", score: { light: 1, order: -1, psyche: 1 }, traits: ["Rebelde", "Creativo"] }
        ]
    },
    {
        id: "power_memory_01",
        q: "Puedes extraer recuerdos pero se desvanecen para siempre.",
        o: [
            { txt: "Preservo los recuerdos más hermosos en mi mente.", score: { light: 1, order: 0, psyche: 2 }, traits: ["Archivista", "Sentimental"] },
            { txt: "Extraigo solo los recuerdos dolorosos.", score: { light: 2, order: 1, psyche: 1 }, traits: ["Sanador", "Altruista"] },
            { txt: "Vendo los recuerdos más valiosos.", score: { light: -2, order: -1, psyche: -2 }, traits: ["Expoliador", "Comerciante"] },
            { txt: "Extraigo mis propios recuerdos para renacer.", score: { light: 0, order: -1, psyche: 0 }, traits: ["Tabula Rasa", "Renacido"] }
        ]
    },
    {
        id: "power_voice_01",
        q: "Tu voz puede materializar pensamientos pero solo en sueños.",
        o: [
            { txt: "Canto mundos oníricos para los demás.", score: { light: 3, order: 1, psyche: 3 }, traits: ["Soñador", "Creador"] },
            { txt: "Gruño pesadillas para entrenar guerreros.", score: { light: -1, order: 1, psyche: -1 }, traits: ["Entrenador", "Duro"] },
            { txt: "Susurro secretos que curan traumas.", score: { light: 2, order: 0, psyche: 2 }, traits: ["Susurrante", "Curador"] },
            { txt: "Grito hasta romper la barrera del sueño.", score: { light: 1, order: -1, psyche: 0 }, traits: ["Roto", "Desesperado"] }
        ]
    }
];

if (typeof window !== 'undefined') window.CONVERGENCE_QUESTIONS = CONVERGENCE_QUESTIONS;
if (typeof module !== 'undefined') module.exports = CONVERGENCE_QUESTIONS;

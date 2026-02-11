# Documentación de Datos S9U (Helios Engine)

Esta carpeta contiene la lógica de datos para el generador de personajes, separada del código principal para facilitar la expansión.

## Archivos

### 1. `convergence_questions_db.js`
Contiene el array `CONVERGENCE_QUESTIONS`. Cada pregunta es un objeto:
- `id`: Identificador único.
- `cond`: Objeto de condiciones (opcional).
    - `rol`: Array de roles permitidos. Si el personaje tiene uno de estos roles, la pregunta es candidata.
    - `mbti_group`: Array de grupos MBTI (Analista, Diplomático, Centinela, Explorador).
- `q`: Texto de la pregunta.
- `o`: Array de opciones.
    - `score`: Puntos que suma a las dimensiones `light`, `order`, `psyche`.

**Cómo agregar una pregunta:**
Simplemente añade un nuevo objeto al array siguiendo el formato. No necesitas tocar `main.js`.

### 2. `helios_psyche_db.js`
Contiene los arquetipos psicológicos finales (`HELIOS_ARCHETYPES_DB`) y la lógica de selección.
- `req`: Requisitos mínimos/máximos de puntuación para que este arquetipo sea seleccionado.

**Dimensiones:**
- **Light**: >0 (Héroe/Bondad), <0 (Villano/Maldad)
- **Order**: >0 (Ley/Estructura), <0 (Caos/Libertad)
- **Psyche**: >0 (Empatía/Sentimiento), <0 (Lógica Fría/Psicopatía)

## Uso en `main.js`
El script principal carga estos archivos y utiliza:
1. `filterQuestions(state)`: Para seleccionar preguntas válidas según el estado actual del personaje.
2. `getHeliosArchetype(finalScore)`: Para obtener el resultado final del test.

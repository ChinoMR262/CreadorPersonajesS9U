// Script generico de sanitizacion Helios (S9U)
// OBJETIVO: detectar lineas enormes con data:image y limpiarlas.
// USO: node sanitize_helios_generic.js
const fs = require('fs');
const path = require('path');

// El archivo objetivo vive en el mismo directorio que este script.
const filePath = path.join(__dirname, 'helios_data.js');

try {
    console.log("Leyendo archivo...");
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("Archivo leído. Dividiendo...");
    const lines = data.split('\n');
    console.log(`Lineas totales: ${lines.length}`);

    let dirty = false;
    const newLines = lines.map((line, index) => {
        if (line.length > 5000 && line.includes('data:image')) {
            console.log(`La línea ${index + 1} es masiva (${line.length} caracteres). Limpiando...`);

            // Intentar extraer ID y nombre para reconstruir una linea segura.
            const idMatch = line.match(/id:\s*'([^']+)'/);
            const nameMatch = line.match(/name:\s*'([^']+)'/);
            const id = idMatch ? idMatch[1] : 'unknown';
            const name = nameMatch ? nameMatch[1] : 'Unknown';

            // Reemplazo robusto:
            // Asume formato `img: 'data:...'` o `img: "data:..."`.
            if (id !== 'unknown') {
                // Intento: reemplazo directo por regex.
                const replaced = line.replace(/img:\s*['"]data:image\/[^'"]+['"]/g, "img: ''");

                if (replaced.length < 1000) {
                    console.log(`  -> Limpiado vía regex. Nueva longitud: ${replaced.length}`);
                    dirty = true;
                    return replaced;
                } else {
                    console.log(`  -> Resultado Regex aún grande (${replaced.length}). Eliminar y reconstruir.`);
                    dirty = true;
                    return `      { id: '${id}', name: '${name}', img: '' }, // Línea masiva auto-sanitizada`;
                }
            } else {
                console.log("  -> No se pudo identificar ID. Reemplazando con comentario vacío.");
                dirty = true;
                return "// [Línea masiva eliminada sin ID]";
            }
        }
        return line;
    });

    if (dirty) {
        console.log("Escribiendo archivo sanitizado...");
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
        console.log('helios_data.js sanitizado exitosamente');
    } else {
        console.log('No se encontraron líneas masivas para limpiar.');
    }

} catch (err) {
    console.error('Error:', err);
}

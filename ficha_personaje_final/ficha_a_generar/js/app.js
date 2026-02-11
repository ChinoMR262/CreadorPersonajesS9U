/* Main App Logic for Ficha Generator */

// --- COLLAPSIBLE SECTIONS ---
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');
    
    console.log('Toggle section clicked', content, icon); // Debug log
    
    if (!content || !icon) {
        console.error('Missing content or icon');
        return;
    }
    
    // Check if section is currently collapsed
    const isCollapsed = content.style.maxHeight === '0px' || content.style.maxHeight === '' || !content.classList.contains('expanded');
    
    console.log('Is collapsed:', isCollapsed);
    
    if (isCollapsed) {
        // Expand section
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
        console.log('Expanding section');
    } else {
        // Collapse section
        content.style.maxHeight = '0px';
        content.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
        console.log('Collapsing section');
    }
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const sections = document.querySelectorAll('.collapsible-content');
    sections.forEach(section => {
        section.style.maxHeight = '0px';
        section.classList.remove('expanded');
    });
    
    const icons = document.querySelectorAll('.collapsible-header i');
    icons.forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
    });
    
    console.log('Collapsible sections initialized');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCollapsibleSections);

// --- RELACIONES LOGIC ---
function addRelacion() {
    // Create UI for new relation
    const container = document.getElementById('relacionesEditorContainer');
    const id = Date.now();

    const div = document.createElement('div');
    div.className = 'rel-row';
    div.dataset.id = id;
    div.style.marginBottom = '15px';
    div.style.padding = '10px';
    div.style.background = 'rgba(255,255,255,0.05)';
    div.style.borderRadius = '8px';
    div.innerHTML = `
        <div style="display:flex; gap:10px; margin-bottom:5px;">
            <input type="text" placeholder="Nombre" class="rel-nombre" oninput="updateRelaciones()" style="flex:1">
            <input type="text" placeholder="Relación (ej. Hermano)" class="rel-rol" oninput="updateRelaciones()" style="flex:1">
        </div>
        <input type="text" placeholder="Tipo (ej. Rivalidad)" class="rel-tipo" oninput="updateRelaciones()" style="width:100%; margin-bottom:5px">
        <textarea placeholder="Descripción detallada..." class="rel-desc" oninput="updateRelaciones()" style="width:100%; height:60px"></textarea>
        <button class="btn btn-secondary btn-small" onclick="removeRelacion(${id})" style="margin-top:5px; width:100%; color:#ff6b6b">Eliminar</button>
    `;

    container.appendChild(div);
}

function removeRelacion(id) {
    const el = document.querySelector(`.rel-row[data-id="${id}"]`);
    if (el) el.remove();
    updateRelaciones();
}

function updateRelaciones() {
    const rows = document.querySelectorAll('.rel-row');
    const rels = [];

    rows.forEach(r => {
        rels.push({
            nombre: r.querySelector('.rel-nombre').value,
            rol: r.querySelector('.rel-rol').value,
            tipo: r.querySelector('.rel-tipo').value,
            desc: r.querySelector('.rel-desc').value
        });
    });

    // Save to DataManager
    DataManager.state.relaciones = rels;
    DataManager.save();

    renderRelacionesPreview(rels);
}

function renderRelacionesPreview(rels) {
    const container = document.getElementById('relacionesPreviewContainer');
    if (!container) return;

    if (!rels || rels.length === 0) {
        container.innerHTML = '<p style="color:var(--water-foam); font-style:italic; text-align:center">Sin registros de vínculos.</p>';
        return;
    }

    let html = '';
    rels.forEach(r => {
        html += `
            <div class="relationship-card">
                <div class="relationship-header">
                    <div class="relationship-name">${r.nombre || '???'}</div>
                    <div class="relationship-role">${r.rol || ''}</div>
                </div>
                ${r.tipo ? `<div class="relationship-type">${r.tipo}</div>` : ''}
                <p class="relationship-description">${(r.desc || '').replace(/\n/g, '<br>')}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Override DataManager.hydrate
const originalHydrate = DataManager.hydrate;
DataManager.hydrate = function () {
    // 1. Text Inputs
    for (const [key, val] of Object.entries(this.state)) {
        const el = document.getElementById(`input_${key}`);
        if (el) el.value = val;
        this.updatePreview(key, val);
    }

    // 2. Relaciones
    if (this.state.relaciones && Array.isArray(this.state.relaciones)) {
        const container = document.getElementById('relacionesEditorContainer');
        container.innerHTML = ''; // Clear defaults

        this.state.relaciones.forEach(r => {
            const id = Date.now() + Math.random();
            const div = document.createElement('div');
            div.className = 'rel-row';
            div.dataset.id = id;
            div.style.marginBottom = '15px';
            div.style.padding = '10px';
            div.style.background = 'rgba(255,255,255,0.05)';
            div.style.borderRadius = '8px';
            div.innerHTML = `
                <div style="display:flex; gap:10px; margin-bottom:5px;">
                    <input type="text" placeholder="Nombre" class="rel-nombre" value="${r.nombre || ''}" oninput="updateRelaciones()" style="flex:1">
                    <input type="text" placeholder="Relación" class="rel-rol" value="${r.rol || ''}" oninput="updateRelaciones()" style="flex:1">
                </div>
                <input type="text" placeholder="Tipo" class="rel-tipo" value="${r.tipo || ''}" oninput="updateRelaciones()" style="width:100%; margin-bottom:5px">
                <textarea placeholder="Descripción..." class="rel-desc" oninput="updateRelaciones()" style="width:100%; height:60px">${r.desc || ''}</textarea>
                <button class="btn btn-secondary btn-small" onclick="removeRelacion('${id}')" style="margin-top:5px; width:100%; color:#ff6b6b">Eliminar</button>
            `;
            container.appendChild(div);
        });
        renderRelacionesPreview(this.state.relaciones);
    }
};

// --- MODAL LOGIC ---
function showResetModal() {
    document.getElementById('resetModal').style.display = 'flex';
}

function closeResetModal() {
    document.getElementById('resetModal').style.display = 'none';
}

function confirmReset() {
    localStorage.removeItem('S9U_Ficha_Gen_v2');
    location.reload();
}

// --- EXPORT FUNCTION WRAPPERS ---
function exportToTXT() {
    if (window.ExportTXT) window.ExportTXT.download(DataManager.state);
}

function exportToPDF() {
    if (window.ExportPDF) window.ExportPDF.download(DataManager.state);
}

function exportToDOCX() {
    if (window.ExportDOCX) window.ExportDOCX.download(DataManager.state);
}

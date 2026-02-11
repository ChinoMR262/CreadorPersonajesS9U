const DataManager = {
    // Default State / Structure
    state: {},

    init: function () {
        const stored = localStorage.getItem('S9U_Ficha_Gen_v2');
        if (stored) {
            try {
                this.state = JSON.parse(stored);
            } catch (e) {
                console.error("Error loading ficha state", e);
                this.state = {};
            }
        } else {
            console.warn("No ficha data found in storage.");
            this.state = {};
        }

        // Hydrate UI
        this.hydrate();

        // Auto-Save listeners are handled via inline 'oninput' in HTML calls to DataManager.update()
        // But for checkboxes or special items we might need more. 
    },

    hydrate: function () {
        // Loop through state keys and update UI inputs if they exist
        for (const [key, val] of Object.entries(this.state)) {
            // Mapping: key -> input_key
            // For text inputs
            const el = document.getElementById(`input_${key}`);
            if (el) {
                el.value = val;
            }

            // Special handling for Arrays if any (like relaciones)
            // Relaciones might need a special renderer in app.js

            // Update Preview immediately
            this.updatePreview(key, val);
        }
    },

    update: function (key, value) {
        this.state[key] = value;
        this.save();
        this.updatePreview(key, value);
    },

    updatePreview: function (key, value) {
        // Find all elements with data-print="key"
        const targets = document.querySelectorAll(`[data-print="${key}"]`);
        targets.forEach(t => {
            // Safety for HTML injection? Since it's local app, innerHTML allows formatting (bold/italic)
            // But usually textContent is safer. Let's use innerHTML for flexibility (user input).
            // Convert newlines to <br> for textareas?
            if (typeof value === 'string') {
                t.innerHTML = value.replace(/\n/g, '<br>');
            } else {
                t.innerHTML = value;
            }
        });
    },

    save: function () {
        localStorage.setItem('S9U_Ficha_Gen_v2', JSON.stringify(this.state));
    },

    reset: function () {
        if (confirm("¿Estás seguro de borrar todos los datos de la ficha actual?")) {
            localStorage.removeItem('S9U_Ficha_Gen_v2');
            location.reload();
        }
    },

    // Exports functionality called by app.js or directly
    getState: function () {
        return this.state;
    }
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    DataManager.init();
});

// Expose
window.DataManager = DataManager;

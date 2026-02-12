import { Preferences } from '@capacitor/preferences';

// Exponer Preferencias globalmente para acceso JS heredado
window.CapPreferences = Preferences;
console.log('Capacitor Preferences Bridge Loaded');

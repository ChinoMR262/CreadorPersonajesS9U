import { Preferences } from '@capacitor/preferences';

// Expose Preferences globally for legacy JS access
window.CapPreferences = Preferences;
console.log('Capacitor Preferences Bridge Loaded');

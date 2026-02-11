// Mock implementation of Capacitor Preferences for browser testing
// This allows the app to run without a full build
console.log('Mock Capacitor Preferences Bridge Loaded');

window.CapPreferences = {
    get: async ({ key }) => {
        const val = localStorage.getItem(key);
        return { value: val };
    },
    set: async ({ key, value }) => {
        localStorage.setItem(key, value);
    },
    remove: async ({ key }) => {
        localStorage.removeItem(key);
    },
    clear: async () => {
        localStorage.clear();
    },
    keys: async () => {
        return { keys: Object.keys(localStorage) };
    }
};

window.storageReady = Promise.resolve();

// src/utils/theme.js

/**
 * Applies the organization's branding to the document root (CSS variables)
 * @param {Object} branding - Branding object from organization settings
 * @param {string} branding.primaryColor - Primary color (hex)
 * @param {string} branding.secondaryColor - Secondary color (hex)
 * @param {string} branding.backgroundColor - Background color (hex)
 * @param {string} branding.fontFamily - Font family string
 */
export const applyTheme = (branding) => {
  if (!branding) return;

  const root = document.documentElement;

  // Set CSS custom properties (variables)
  root.style.setProperty('--primary-color', branding.primaryColor || '#1976d2');
  root.style.setProperty('--secondary-color', branding.secondaryColor || '#dc004e');
  root.style.setProperty('--background-color', branding.backgroundColor || '#f5f5f5');
  root.style.setProperty('--font-family', branding.fontFamily || 'Roboto, sans-serif');

  // Persist theme in localStorage so it survives page reloads
  try {
    localStorage.setItem('lms_theme', JSON.stringify(branding));
  } catch (e) {
    console.warn('Could not save theme to localStorage:', e);
  }
};

/**
 * Loads theme from localStorage and applies it on app start.
 * If no stored theme exists, applies defaults.
 */
export const loadStoredTheme = () => {
  if (typeof window === 'undefined') return; // Skip on server-side

  try {
    const storedTheme = localStorage.getItem('lms_theme');
    if (storedTheme) {
      const theme = JSON.parse(storedTheme);
      applyTheme(theme);
    } else {
      // Apply default theme if none stored
      applyTheme({
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Roboto, sans-serif'
      });
    }
  } catch (error) {
    console.error('Failed to load stored theme:', error);
    // Fallback to defaults on error
    applyTheme({});
  }
};

/**
 * Resets theme to defaults (useful for admin when clearing settings)
 */
export const resetTheme = () => {
  localStorage.removeItem('lms_theme');
  applyTheme({
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Roboto, sans-serif'
  });
};

// Automatically load stored theme when this module is imported (on client side only)
if (typeof window !== 'undefined') {
  loadStoredTheme();
}
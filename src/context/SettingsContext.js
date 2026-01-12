import React, { createContext, useState, useEffect, useCallback } from 'react';
import { organizationAPI } from '../services/api';
import { applyTheme } from '../utils/theme';
// Inside updateSettings or uploadLogo methods:

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Inside updateSettings or uploadLogo methods:

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await organizationAPI.getSettings();
      setSettings(data);
      applyTheme(data.branding);
      // Inside updateSettings or uploadLogo methods:
      
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load settings');
      console.error('Settings fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const updated = await organizationAPI.updateSettings(newSettings);
      setSettings(updated.settings);
      applyTheme(updated.settings.branding);
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  const uploadLogo = useCallback(async (file) => {
    try {
      const result = await organizationAPI.uploadLogo(file);
      setSettings(prev => ({
        ...prev,
        branding: {
          ...prev.branding,
          logo: result.logo
        }
      }));
      return result;
    } catch (err) {
      throw err;
    }
  }, []);

  const value = {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    uploadLogo,
    isAdmin: localStorage.getItem('role') === 'admin'
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
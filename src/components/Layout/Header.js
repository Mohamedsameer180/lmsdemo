import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import './Header.css';

export const Header = () => {
  const { settings } = useSettings();
  const logoUrl = settings?.branding?.logo?.filename 
    ? `/api/organization/logo/${settings.branding.logo.filename}`
    : null;

  return (
    <header className="header" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="header-content">
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt={settings?.name || 'LMS'} 
            className="header-logo"
          />
        )}
        <h1 className="header-title">{settings?.name || 'Learning Management System'}</h1>
        <nav className="header-nav">
          <a href="/">Dashboard</a>
          {localStorage.getItem('role') === 'admin' && (
            <a href="/admin/settings">Admin Settings</a>
          )}
        </nav>
      </div>
    </header>
  );
};
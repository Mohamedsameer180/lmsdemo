import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import './Footer.css';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="footer" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} {settings?.name || 'Organization'}</p>
        <p>{settings?.contact?.email} | {settings?.contact?.phone}</p>
      </div>
    </footer>
  );
};
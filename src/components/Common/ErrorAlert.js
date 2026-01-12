import React from 'react';
import './ErrorAlert.css';

export const ErrorAlert = ({ message }) => (
  <div className="alert alert-error">
    <strong>Error:</strong> {message}
  </div>
);
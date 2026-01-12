import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import './Dashboard.css';

export const Dashboard = () => {
  const { settings, loading, error } = useSettings();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Welcome to {settings.name}</h2>
        <p>{settings.description}</p>
      </div>

      <div className="policy-info">
        <h3>Current Learning Policies</h3>
        <ul>
          <li>Course Access: {settings.policies.courseAccess}</li>
          <li>Pass Rate: {settings.policies.assessmentPassPercentage}%</li>
          <li>Max Attempts: {settings.policies.assessmentMaxAttempts}</li>
          <li>Certification Valid: {settings.policies.certificationValidityMonths} months</li>
        </ul>
      </div>
    </div>
  );
};
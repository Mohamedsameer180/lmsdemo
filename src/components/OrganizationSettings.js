import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { ProfileSection } from './Admin/ProfileSection';
import { BrandingSection } from './Admin/BrandingSection';
import { PoliciesSection } from './Admin/PoliciesSection';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { ErrorAlert } from '../Common/ErrorAlert';
import toast from 'react-hot-toast';
import './OrganizationSettings.css';

export const OrganizationSettings = () => {
  const { settings, loading, error, updateSettings, uploadLogo } = useSettings();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveAll = async () => {
    try {
      await updateSettings(settings);
      toast.success('All settings saved successfully!');
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="organization-settings">
      <div className="settings-header">
        <h1>Organization Settings</h1>
        <button className="btn btn-primary" onClick={handleSaveAll}>
          Save All Changes
        </button>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'branding' ? 'active' : ''}`}
          onClick={() => setActiveTab('branding')}
        >
          Branding
        </button>
        <button
          className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveTab('policies')}
        >
          Learning Policies
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'branding' && <BrandingSection />}
        {activeTab === 'policies' && <PoliciesSection />}
      </div>
    </div>
  );
};
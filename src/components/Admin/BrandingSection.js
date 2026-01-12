import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './BrandingSection.css';

export const BrandingSection = () => {
  const { settings, updateSettings, uploadLogo } = useSettings();
  const [previewLogo, setPreviewLogo] = useState(null);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      primaryColor: settings.branding.primaryColor,
      secondaryColor: settings.branding.secondaryColor,
      backgroundColor: settings.branding.backgroundColor,
      fontFamily: settings.branding.fontFamily
    }
  });

  const colors = watch();

  const onSubmit = async (data) => {
    try {
      await updateSettings({
        'branding.primaryColor': data.primaryColor,
        'branding.secondaryColor': data.secondaryColor,
        'branding.backgroundColor': data.backgroundColor,
        'branding.fontFamily': data.fontFamily
      });
      toast.success('Branding updated successfully!');
    } catch (err) {
      toast.error('Failed to update branding');
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be less than 2MB');
      return;
    }

    try {
      setPreviewLogo(URL.createObjectURL(file));
      await uploadLogo(file);
      toast.success('Logo uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload logo');
    }
  };

  const logoUrl = settings.branding.logo?.filename 
    ? organizationAPI.getLogoUrl(settings.branding.logo.filename)
    : null;

  return (
    <div className="branding-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Branding & Theme</h2>
        </div>

        <div className="branding-preview">
          <h3>Preview</h3>
          <div className="preview-container" style={{ 
            backgroundColor: colors.backgroundColor,
            fontFamily: colors.fontFamily
          }}>
            <div className="preview-header" style={{ backgroundColor: colors.primaryColor }}>
              {logoUrl && <img src={previewLogo || logoUrl} alt="Logo" className="preview-logo" />}
              <h4 style={{ color: 'white' }}>{settings.name}</h4>
            </div>
            <div className="preview-content">
              <p>This is how your branding will appear across the platform.</p>
              <button className="btn" style={{ backgroundColor: colors.secondaryColor, color: 'white' }}>
                Sample Button
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="logo">Organization Logo</label>
            <div className="logo-upload">
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="file-input"
              />
              <label htmlFor="logo" className="file-label">
                Choose Logo (Max 2MB)
              </label>
              {(previewLogo || logoUrl) && (
                <img 
                  src={previewLogo || logoUrl} 
                  alt="Current Logo" 
                  className="current-logo"
                />
              )}
            </div>
          </div>

          <div className="color-grid">
            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color *</label>
              <div className="color-input-group">
                <input
                  id="primaryColor"
                  type="color"
                  className="color-picker"
                  {...register('primaryColor', { required: true })}
                />
                <input
                  type="text"
                  className="form-control"
                  value={colors.primaryColor}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="secondaryColor">Secondary Color *</label>
              <div className="color-input-group">
                <input
                  id="secondaryColor"
                  type="color"
                  className="color-picker"
                  {...register('secondaryColor', { required: true })}
                />
                <input
                  type="text"
                  className="form-control"
                  value={colors.secondaryColor}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="backgroundColor">Background Color *</label>
              <div className="color-input-group">
                <input
                  id="backgroundColor"
                  type="color"
                  className="color-picker"
                  {...register('backgroundColor', { required: true })}
                />
                <input
                  type="text"
                  className="form-control"
                  value={colors.backgroundColor}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fontFamily">Font Family *</label>
            <select
              id="fontFamily"
              className="form-control"
              {...register('fontFamily', { required: true })}
            >
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Inter, sans-serif">Inter</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Branding
          </button>
        </form>
      </div>
    </div>
  );
};
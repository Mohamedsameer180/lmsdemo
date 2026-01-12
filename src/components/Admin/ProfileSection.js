import React from 'react';
import { useForm } from 'react-hook-form';
import { useSettings } from '../../hooks/useSettings';
import toast from 'react-hot-toast';
import './ProfileSection.css';

export const ProfileSection = () => {
  const { settings, updateSettings } = useSettings();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: settings.name,
      description: settings.description,
      'contact.email': settings.contact.email,
      'contact.phone': settings.contact.phone,
      'contact.address': settings.contact.address,
      timezone: settings.timezone,
      locale: settings.locale
    }
  });

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        name: data.name,
        description: data.description,
        contact: {
          email: data['contact.email'],
          phone: data['contact.phone'],
          address: data['contact.address']
        },
        timezone: data.timezone,
        locale: data.locale
      };
      
      await updateSettings(formattedData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="profile-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Organization Profile</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Organization Name *</label>
            <input
              id="name"
              className="form-control"
              {...register('name', { required: 'Name is required', minLength: 3 })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mission Statement *</label>
            <textarea
              id="description"
              className="form-control"
              rows="4"
              {...register('description', { required: 'Description is required', minLength: 10 })}
            />
            {errors.description && <span className="error">{errors.description.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact.email">Email *</label>
            <input
              id="contact.email"
              type="email"
              className="form-control"
              {...register('contact.email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors['contact.email'] && <span className="error">{errors['contact.email'].message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact.phone">Phone *</label>
            <input
              id="contact.phone"
              className="form-control"
              {...register('contact.phone', { required: 'Phone is required' })}
            />
            {errors['contact.phone'] && <span className="error">{errors['contact.phone'].message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact.address">Address *</label>
            <textarea
              id="contact.address"
              className="form-control"
              rows="3"
              {...register('contact.address', { required: 'Address is required' })}
            />
            {errors['contact.address'] && <span className="error">{errors['contact.address'].message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Timezone *</label>
            <select
              id="timezone"
              className="form-control"
              {...register('timezone', { required: 'Timezone is required' })}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
              <option value="Asia/Shanghai">Shanghai (CST)</option>
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="Australia/Sydney">Sydney (AEST)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="locale">Locale *</label>
            <select
              id="locale"
              className="form-control"
              {...register('locale', { required: 'Locale is required' })}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="ja-JP">日本語</option>
              <option value="zh-CN">中文</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSettings } from '../../hooks/useSettings';
import toast from 'react-hot-toast';
import './PoliciesSection.css';

export const PoliciesSection = () => {
  const { settings, updateSettings } = useSettings();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      courseAccess: settings.policies.courseAccess,
      assessmentPassPercentage: settings.policies.assessmentPassPercentage,
      assessmentMaxAttempts: settings.policies.assessmentMaxAttempts,
      certificationValidityMonths: settings.policies.certificationValidityMonths,
      certificationRenewalRequired: settings.policies.certificationRenewalRequired,
      learningDeadlineDays: settings.policies.learningDeadlineDays,
      complianceRequired: settings.policies.complianceRequired
    }
  });

  const onSubmit = async (data) => {
    try {
      const policyData = {
        'policies.courseAccess': data.courseAccess,
        'policies.assessmentPassPercentage': parseInt(data.assessmentPassPercentage),
        'policies.assessmentMaxAttempts': parseInt(data.assessmentMaxAttempts),
        'policies.certificationValidityMonths': parseInt(data.certificationValidityMonths),
        'policies.certificationRenewalRequired': data.certificationRenewalRequired === 'true',
        'policies.learningDeadlineDays': parseInt(data.learningDeadlineDays),
        'policies.complianceRequired': data.complianceRequired === 'true'
      };
      
      await updateSettings(policyData);
      toast.success('Policies updated successfully!');
    } catch (err) {
      toast.error('Failed to update policies');
    }
  };

  return (
    <div className="policies-section">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Learning Policies</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="policy-grid">
            <div className="form-group">
              <label htmlFor="courseAccess">Course Access *</label>
              <select
                id="courseAccess"
                className="form-control"
                {...register('courseAccess', { required: true })}
              >
                <option value="open">Open to All</option>
                <option value="restricted">Restricted</option>
                <option value="role-based">Role-Based</option>
              </select>
              <small className="help-text">Controls who can enroll in courses</small>
            </div>

            <div className="form-group">
              <label htmlFor="assessmentPassPercentage">Pass Percentage (%)</label>
              <input
                id="assessmentPassPercentage"
                type="number"
                min="0"
                max="100"
                className="form-control"
                {...register('assessmentPassPercentage', { required: true })}
              />
              <small className="help-text">Minimum score to pass assessments</small>
            </div>

            <div className="form-group">
              <label htmlFor="assessmentMaxAttempts">Max Attempts</label>
              <input
                id="assessmentMaxAttempts"
                type="number"
                min="1"
                max="10"
                className="form-control"
                {...register('assessmentMaxAttempts', { required: true })}
              />
              <small className="help-text">Maximum assessment retakes allowed</small>
            </div>

            <div className="form-group">
              <label htmlFor="certificationValidityMonths">Certification Validity (Months)</label>
              <input
                id="certificationValidityMonths"
                type="number"
                min="1"
                max="60"
                className="form-control"
                {...register('certificationValidityMonths', { required: true })}
              />
              <small className="help-text">How long certifications remain valid</small>
            </div>

            <div className="form-group">
              <label htmlFor="learningDeadlineDays">Learning Deadline (Days)</label>
              <input
                id="learningDeadlineDays"
                type="number"
                min="1"
                max="365"
                className="form-control"
                {...register('learningDeadlineDays', { required: true })}
              />
              <small className="help-text">Default deadline for course completion</small>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('certificationRenewalRequired')}
                value="true"
                defaultChecked={settings.policies.certificationRenewalRequired}
              />
              <span>Require certification renewal</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('complianceRequired')}
                value="true"
                defaultChecked={settings.policies.complianceRequired}
              />
              <span>Enable compliance tracking</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Policies
          </button>
        </form>
      </div>
    </div>
  );
};
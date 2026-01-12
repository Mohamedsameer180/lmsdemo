const Organization = require('../models/Organization');

// @desc    Get organization settings
// @route   GET /api/organization/settings
// @access  Public (for global theming) / Private (for admin config)
const getSettings = async (req, res, next) => {
  try {
    const settings = await Organization.findOne().sort({ createdAt: -1 });
    
    if (!settings) {
      return res.status(404).json({ message: 'Organization settings not found' });
    }
    
    // Return full data for admin, filtered for public
    if (req.user?.role === 'admin') {
      res.status(200).json(settings);
    } else {
      // Public response (for global theming)
      res.status(200).json({
        name: settings.name,
        description: settings.description,
        contact: settings.contact,
        timezone: settings.timezone,
        locale: settings.locale,
        branding: settings.branding,
        policies: {
          courseAccess: settings.policies.courseAccess,
          assessmentPassPercentage: settings.policies.assessmentPassPercentage,
          assessmentMaxAttempts: settings.policies.assessmentMaxAttempts,
          // Don't expose internal policy details publicly
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update organization settings
// @route   PUT /api/organization/settings
// @access  Admin only
const updateSettings = async (req, res, next) => {
  try {
    const settings = await Organization.findOne();
    
    if (!settings) {
      return res.status(404).json({ message: 'Organization settings not found' });
    }
    
    // Update fields
    const allowedFields = [
      'name', 'description', 'contact', 'timezone', 'locale',
      'branding.primaryColor', 'branding.secondaryColor',
      'branding.backgroundColor', 'branding.fontFamily',
      'policies.courseAccess', 'policies.assessmentPassPercentage',
      'policies.assessmentMaxAttempts', 'policies.certificationValidityMonths',
      'policies.certificationRenewalRequired', 'policies.learningDeadlineDays',
      'policies.complianceRequired'
    ];
    
    // Only update fields that are present in request
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        const keys = key.split('.');
        if (keys.length === 2) {
          settings[keys[0]][keys[1]] = req.body[key];
        } else {
          settings[key] = req.body[key];
        }
      }
    });
    
    // Track who made the change
    if (req.user) {
      settings.lastModifiedBy = req.user.id;
    }
    
    await settings.save();
    
    res.status(200).json({
      message: 'Settings updated successfully',
      settings,
      version: settings.version
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload organization logo
// @route   POST /api/organization/logo
// @access  Admin only
const uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No logo file provided' });
    }
    
    const settings = await Organization.findOne();
    
    if (!settings) {
      // Delete uploaded file if settings don't exist
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Organization settings not found' });
    }
    
    // Delete old logo if exists
    if (settings.branding.logo?.path) {
      const fs = require('fs');
      const oldPath = path.join(__dirname, '..', settings.branding.logo.path);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    // Update logo info
    settings.branding.logo = {
      filename: req.file.filename,
      path: req.file.path.replace(/\\/g, '/'), // Normalize path
      uploadedAt: new Date()
    };
    
    if (req.user) {
      settings.lastModifiedBy = req.user.id;
    }
    
    await settings.save();
    
    res.status(200).json({
      message: 'Logo uploaded successfully',
      logo: settings.branding.logo
    });
  } catch (error) {
    // Delete uploaded file on error
    if (req.file) {
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Get logo file
// @route   GET /api/organization/logo/:filename
// @access  Public
const getLogo = async (req, res, next) => {
  try {
    const settings = await Organization.findOne();
    
    if (!settings?.branding.logo?.filename || 
        settings.branding.logo.filename !== req.params.filename) {
      return res.status(404).json({ message: 'Logo not found' });
    }
    
    const path = require('path');
    const logoPath = path.join(__dirname, '..', settings.branding.logo.path);
    res.sendFile(logoPath);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
  uploadLogo,
  getLogo
};
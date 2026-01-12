const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const organizationController = require('../controllers/organizationController');
const upload = require('../utils/fileUpload');

// @route   GET /api/organization/settings
router.get('/settings', verifyToken, organizationController.getSettings);

// @route   PUT /api/organization/settings
router.put(
  '/settings',
  verifyToken,
  requireAdmin,
  [
    body('name').optional().isLength({ min: 3, max: 100 }).trim(),
    body('description').optional().isLength({ min: 10, max: 1000 }).trim(),
    body('contact.email').optional().isEmail().normalizeEmail(),
    body('contact.phone').optional().isLength({ min: 10, max: 20 }),
    body('timezone').optional().isIn([
      'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago',
      'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai',
      'Asia/Kolkata', 'Australia/Sydney'
    ]),
    body('locale').optional().isIn(['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN']),
    body('branding.primaryColor').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    body('branding.secondaryColor').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    body('branding.backgroundColor').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    body('policies.assessmentPassPercentage').optional().isInt({ min: 0, max: 100 }),
    body('policies.assessmentMaxAttempts').optional().isInt({ min: 1, max: 10 })
  ],
  organizationController.updateSettings
);

// @route   POST /api/organization/logo
router.post(
  '/logo',
  verifyToken,
  requireAdmin,
  upload.single('logo'),
  organizationController.uploadLogo
);

// @route   GET /api/organization/logo/:filename
router.get('/logo/:filename', organizationController.getLogo);

module.exports = router;
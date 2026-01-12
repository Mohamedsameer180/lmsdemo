const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  contact: {
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: [500, 'Address cannot exceed 500 characters']
    }
  },
  timezone: {
    type: String,
    default: 'UTC',
    enum: [
      'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago',
      'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai',
      'Asia/Kolkata', 'Australia/Sydney'
    ]
  },
  locale: {
    type: String,
    default: 'en-US',
    enum: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN']
  },
  branding: {
    logo: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    primaryColor: {
      type: String,
      required: true,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color']
    },
    secondaryColor: {
      type: String,
      required: true,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color']
    },
    backgroundColor: {
      type: String,
      required: true,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color']
    },
    fontFamily: {
      type: String,
      required: true,
      enum: [
        'Roboto, sans-serif', 'Open Sans, sans-serif', 'Lato, sans-serif',
        'Montserrat, sans-serif', 'Poppins, sans-serif', 'Inter, sans-serif'
      ]
    }
  },
  policies: {
    courseAccess: {
      type: String,
      required: true,
      enum: ['open', 'restricted', 'role-based'],
      default: 'role-based'
    },
    assessmentPassPercentage: {
      type: Number,
      required: true,
      min: [0, 'Pass percentage must be at least 0'],
      max: [100, 'Pass percentage cannot exceed 100'],
      default: 70
    },
    assessmentMaxAttempts: {
      type: Number,
      required: true,
      min: [1, 'At least 1 attempt required'],
      max: [10, 'Maximum 10 attempts allowed'],
      default: 3
    },
    certificationValidityMonths: {
      type: Number,
      required: true,
      min: [1, 'Validity must be at least 1 month'],
      max: [60, 'Validity cannot exceed 60 months'],
      default: 12
    },
    certificationRenewalRequired: {
      type: Boolean,
      default: true
    },
    learningDeadlineDays: {
      type: Number,
      required: true,
      min: [1, 'Deadline must be at least 1 day'],
      max: [365, 'Deadline cannot exceed 365 days'],
      default: 30
    },
    complianceRequired: {
      type: Boolean,
      default: false
    }
  },
  version: {
    type: Number,
    default: 1
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// Increment version on each update
organizationSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Organization', organizationSchema);
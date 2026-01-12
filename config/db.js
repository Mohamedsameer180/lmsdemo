const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize default organization settings if none exist
    const Organization = require('../models/Organization');
    const existingOrg = await Organization.findOne();
    
    if (!existingOrg) {
      const defaultOrg = new Organization({
        name: 'Default Organization',
        description: 'Update your organization details',
        contact: {
          email: 'admin@example.com',
          phone: '+1234567890',
          address: '123 Main St, City, Country'
        },
        branding: {
          primaryColor: '#1976d2',
          secondaryColor: '#dc004e',
          backgroundColor: '#f5f5f5',
          fontFamily: 'Roboto, sans-serif'
        },
        policies: {
          courseAccess: 'role-based',
          assessmentPassPercentage: 70,
          assessmentMaxAttempts: 3,
          certificationValidityMonths: 12,
          certificationRenewalRequired: true,
          learningDeadlineDays: 30,
          complianceRequired: false
        }
      });
      
      await defaultOrg.save();
      console.log('✅ Default organization settings created');
    }
  } catch (error) {
    console.error(`❌ Database Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
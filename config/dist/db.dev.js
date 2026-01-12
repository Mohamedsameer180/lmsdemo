"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB() {
  var conn, Organization, existingOrg, defaultOrg;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          conn = _context.sent;
          console.log("\u2705 MongoDB Connected: ".concat(conn.connection.host)); // Initialize default organization settings if none exist

          Organization = require('../models/Organization');
          _context.next = 8;
          return regeneratorRuntime.awrap(Organization.findOne());

        case 8:
          existingOrg = _context.sent;

          if (existingOrg) {
            _context.next = 14;
            break;
          }

          defaultOrg = new Organization({
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
          _context.next = 13;
          return regeneratorRuntime.awrap(defaultOrg.save());

        case 13:
          console.log('✅ Default organization settings created');

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("\u274C Database Error: ".concat(_context.t0.message));
          process.exit(1);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = connectDB;
//# sourceMappingURL=db.dev.js.map

"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var helmet = require('helmet');

var rateLimit = require('express-rate-limit');

var path = require('path');

require('dotenv').config();

var connectDB = require('./config/db');

var organizationRoutes = require('./routes/organization');

var errorHandler = require('./middleware/errorHandler');

var app = express(); // Security middleware

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
})); // Rate limiting

var limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs

});
app.use('/api/', limiter); // Body parsing

app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
})); // Serve static files (uploaded logos)

app.use('/uploads', express["static"](path.join(__dirname, 'uploads'))); // Database connection

connectDB(); // Routes

app.use('/api/organization', organizationRoutes); // Health check

app.get('/api/health', function (req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
}); // Error handling middleware

app.use(errorHandler); // 404 handler

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Route not found'
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
  console.log("\uD83D\uDCC1 Upload directory: ".concat(path.join(__dirname, process.env.UPLOAD_PATH)));
});
//# sourceMappingURL=server.dev.js.map

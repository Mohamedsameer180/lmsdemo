"use strict";

var multer = require('multer');

var path = require('path');

var fs = require('fs'); // Ensure upload directory exists


var uploadDir = process.env.UPLOAD_PATH || './uploads/logos';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true
  });
} // Configure Multer storage


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    var ext = path.extname(file.originalname);
    cb(null, 'logo-' + uniqueSuffix + ext);
  }
}); // File filter for images only

var fileFilter = function fileFilter(req, file, cb) {
  var allowedTypes = /jpeg|jpg|png|gif|svg/;
  var extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  var mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(new Error('Only image files (JPEG, JPG, PNG, GIF, SVG) are allowed'));
}; // Multer upload configuration


var upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_LOGO_SIZE) || 2 * 1024 * 1024 // 2MB default

  },
  fileFilter: fileFilter
});
module.exports = upload;
//# sourceMappingURL=fileUpload.dev.js.map

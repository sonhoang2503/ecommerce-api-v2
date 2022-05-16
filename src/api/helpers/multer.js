const multer = require('multer');
const ApiError = require('./ApiError');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(
        ApiError.badRequest('File is not image! please upload images only!'),
        false
      );
    }
  },
});

exports.uploadMultipleImages = upload.array('images', 8);
exports.uploadImage = upload.single('image');

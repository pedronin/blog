const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  fileName: (req, file, cb) => {
    // file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    cb(null, file.originalname + path.extname(file.originalname));
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
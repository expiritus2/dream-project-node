const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const TargetObjectController = require('../controllers/targetObject');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        const isValid = MIME_TYPE_MAP[files.mimetype];
        let error = new Error("Invalid mime type");

        if (isValid) {
            error = null;
        }
        cb(error, "public/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

module.exports = (app) => {
    app.post('/personal-area/put-target', checkAuth, multer({storage}).array("images[]"), TargetObjectController.createTargetObject);
};
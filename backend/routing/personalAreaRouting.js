const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const {createTargetObject, getRelatedObjectsByUser} = require('../controllers/targetController');

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
        // const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now() + '-' + name);
    }
});

router.post('/put-target', checkAuth, multer({storage}).array("images[]"), createTargetObject);

router.get('/get-target-objects', checkAuth, getRelatedObjectsByUser);

module.exports = router;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb ( null, path.join( __dirname, "../public", "uploads"));
    },
    filename: ( req, file, cb ) => {
        cb( null, Date.now() + file.originalname );
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = new Set(['image/png', 'image/jpg', 'image/jpeg']);
    if ( !allowed.has(file.mimetype) ) cb( `only image are allowed!` );
    cb( null, true )
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;
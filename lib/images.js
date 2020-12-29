const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now()+'-'+file.originalname)
    },
    limits: 
    (req,file,cb) => {
        fileSize: 1024 * 1024 * 3 
    }
});
 

const upload = multer({storage});

module.exports = upload;
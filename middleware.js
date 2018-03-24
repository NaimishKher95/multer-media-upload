const multer = require('multer');

const upload = (file) => {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })
    return multer({ storage: storage }).array(file);
}
module.exports = {
    upload
}
const app = require('express')();
const multer = require('multer');
const uploadMiddleware = require('./middleware');
const qrImage = require('qr-image'); // for creating QR Code Image.

let qr_png = qrImage.image('I love QR!', { type: 'png' });
qr_png.pipe(require('fs').createWriteStream('i_love_qr.png'));
let png_string = qrImage.imageSync('I love QR!', { type: 'png' });

app.post('/imgUploadFN', (req, res) => {
    let storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })
    let upload = multer({ storage: storage }).single('img');

    upload(req, res, (err) => {
        if (err) return res.send({ err: err });
        res.send({ name: req.body.name, file: req.file });
    })
})

// you can upload file using middleware
app.post('/imgUploadMiddleWare', uploadMiddleware.upload('img'), (req, res) => {
    res.send({ name: req.body.name, file: req.file });
})


app.post('/imgUploadMiddleWareDirect', multer({ dest: './uploads/' }).single('img'), (req, res) => {
    res.send({ name: req.body.name, file: req.file });
})

app.listen(3000, () => console.log("Server running on 3000"))
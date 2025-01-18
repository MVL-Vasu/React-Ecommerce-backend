const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
     destination: 'upload/images',
     filename: (req, file, cb) => {
          return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
     }
})

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images

router.use('/images', express.static('upload/images'))

router.post("/upload", upload.single('product'), (req, res) => {
     res.json({
          success: 1,
          image_url: `http://localhost:3001/api/images/${req.file.filename}`
     })
})

module.exports = router;
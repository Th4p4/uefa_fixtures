const express = require('express')
const { uploadImage } = require('../controller/image_controller')
const router = express.Router()
const fileUpload = require('../middleware/file_upload')


router.post('/upload',fileUpload.single('image'),uploadImage)

module.exports = router
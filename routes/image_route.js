const express = require("express");
const { uploadImage } = require("../controller/image_controller");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage()


const uploads = multer({ storage });

router.post("/upload", uploads.single("image"), uploadImage);

module.exports = router;

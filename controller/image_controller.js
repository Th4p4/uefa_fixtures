const Image = require("../model/image_upload_model");
const sharp = require("sharp");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

exports.uploadImage = async (req, res, next) => {
  console.log(req.file);
  try {
    const thumbnail_dir = "upload/images/" + uuid.v1() +"."+ MIME_TYPE_MAP[req.file.mimetype]
    console.log(thumbnail_dir)
    await sharp(req.file.buffer)
      .resize(200, 200)
      .toFile(thumbnail_dir);
    const image = new Image({
      thumbnail: thumbnail_dir,
    });
    await image.save();
    res.json("uploaded succesfully.");
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

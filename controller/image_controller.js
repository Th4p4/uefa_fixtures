const Image = require("../model/image_upload");
const sharp = require("sharp");
const uuid = require("uuid");
const HttpError = require("../model/http_error");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

exports.uploadImage = async (req, res, next) => {
  // console.log(req.file);
  if(!req.file) {
    const error= new HttpError("Couldn't get the file, Please upload again.",404)
    return next(error)
  }
  try {
    const thumbnail_dir = "upload/images/" + uuid.v1() +"."+ MIME_TYPE_MAP[req.file.mimetype]
    console.log(thumbnail_dir)
    await sharp(req.file.buffer)
      .resize(200, 200)
      .toFile(thumbnail_dir);
    const image = new Image({
      thumbnail: thumbnail_dir,
    });
    console.log('thapa')
    await image.save();
    console.log('sandeep')
   
  } catch {
    const error = new HttpError("Failed to upload images, Please try again later",500)
    return next(error)
  }
  res.status(200).json("uploaded succesfully.");
};

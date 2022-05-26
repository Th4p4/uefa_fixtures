const Image = require("../model/image_upload_model");
const sharp = require("sharp");
const paths = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

exports.uploadImage = async (req, res, next) => {
  const { path, destination, filename } = req.file;
  try {
    const thumbnail_dir = destination + `\\thumbnail_${filename}`;
    sharp(path).resize(200, 200).jpeg({ quality: 50 }).toFile(thumbnail_dir);
    const image = new Image({
      orgImage: path,
      thumbnail: thumbnail_dir,
    });
    await image.save();
    res.json("uploaded succesfully.");
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

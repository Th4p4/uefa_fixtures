const multer = require('multer')
const uuid = require('uuid')

const MIME_TYPE_MAP = {
    'image/png':"png",
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}

 const fileUpload = multer({
    limit:500000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'upload/images')
        },
        filename:(req,file,cb)=>{
            const ext = MIME_TYPE_MAP[file.mimetype]
            await sharp(path).resize(200, 200).jpeg({ quality: 50 }).toFile(thumbnail_dir);
            cb(null,uuid.v1()+"."+ext)
           
        },
        fileFilter:(req,file,cb)=>{
            const isValid = !!MIME_TYPE_MAP[file.mimetype]
            let error = isValid?null:new Error("invalid mime type")
            cb(error,isValid)
        }
    })
})

module.exports= fileUpload;

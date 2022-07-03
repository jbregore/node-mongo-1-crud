import multer from "multer";
import path from "path";


const Storage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const fileUpload = (destination) => multer({
    storage: Storage(destination),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed"))
        }
    },
    onError: function(err, next){
        return console.log("error", err);
        next(err);
    }
}).single("image");

export default fileUpload;
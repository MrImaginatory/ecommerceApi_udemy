import multer from "multer";
import path from "path";
import fs from 'fs';
// Memory storage instead of disk
const storage = multer.memoryStorage();

if(!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

// Export configurations
export default upload; // for one image
// export const uploadMultiple = upload.array('images', 10); // for up to 10 images
// export const uploadFlexible = upload.any(); // accepts any number of files

import multer from 'multer';



// Multer storage configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      if (req.url.includes('/profile/img')) {
        cb(null, './uploads/user');
    } else if (req.url.includes('/')) {
        cb(null, './uploads/product');
    } else {
      cb(new Error('Not an image! Please upload only images.'), "false");
    }
    },
    filename: (req, file, cb) => {
        // The filenames will be kept as original name with extension added by multer
        const origName = `${file.originalname}`; 
        const extName = `.${file.mimetype.split('/')[1]}`;

        // Remove the extension from the original filename
        const fileNameWithoutExt = origName.substring(0, origName.lastIndexOf('.'));
        
        cb(null, fileNameWithoutExt + '-' + Date.now() + extName);
    }
});


const multerFilter = (req: any, file: any, cb: any) => {
  // console.log("1" +file.mimetype);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Multer configuration for product images
export const uploadProductImages = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).fields([{ name: 'images' }]);

// Multer configuration for user profile photos
export const uploadUserProfilePhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 2MB for profile photos
}).single('profilePhoto');

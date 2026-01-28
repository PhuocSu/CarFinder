import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'notice',
    format: file.mimetype.split('/')[1],
  }),
});
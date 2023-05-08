import { Request, Response } from "express";
import multer, { memoryStorage } from 'multer';
import AWS, { S3 } from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });
  export const upload = multer({
    storage: memoryStorage(),
    limits: {
      fileSize: 1024 * 1024 * 1 // 1 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          const error = new Error('Invalid file type. Only JPEG, PNG, and JPG files are allowed.');
          return cb(error);
        }
        if (file.size > 1024 * 1024 * 1) {
          const error = new Error('File size exceeds the limit of 1 MB.');
          return cb(error);
        }
        cb(null, true);
    }
  }).single('file');


export const previewImg = async(req: Request, res: Response )=>{
    try{
        const file = req.file ;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        } else{
            const buffer = file.buffer;
      
          // // upload the image data to AWS S3 bucket
          const params = {
            Bucket: 'fileuploadpoctask',
            Key: file.originalname,
            Body: buffer,
          };
      
          s3.upload(params, function(err: Error, data: AWS.S3.ManagedUpload.SendData) {
            if (err) {
              //Error uploading image to AWS S3 bucket
              return res.status(500).json({ message: 'Error uploading image to AWS S3 bucket' });
            }
            //Image uploaded to AWS S3 bucket
      
            // return the image URL to the user
            const imageUrl: string = data.Location || '';
            return res.status(200).json({ imageUrl }),imageUrl;
          });
        }
          
    }catch(err){
        res.status(500).json({err});
    }
}
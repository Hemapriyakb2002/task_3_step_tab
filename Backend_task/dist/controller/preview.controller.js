"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewImg = exports.upload = void 0;
const multer_1 = __importStar(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});
exports.upload = (0, multer_1.default)({
    storage: (0, multer_1.memoryStorage)(),
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
const previewImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        else {
            const buffer = file.buffer;
            // // upload the image data to AWS S3 bucket
            const params = {
                Bucket: 'fileuploadpoctask',
                Key: file.originalname,
                Body: buffer,
            };
            s3.upload(params, function (err, data) {
                if (err) {
                    //Error uploading image to AWS S3 bucket
                    return res.status(500).json({ message: 'Error uploading image to AWS S3 bucket' });
                }
                //Image uploaded to AWS S3 bucket
                // return the image URL to the user
                const imageUrl = data.Location || '';
                return res.status(200).json({ imageUrl }), imageUrl;
            });
        }
    }
    catch (err) {
        res.status(500).json({ err });
    }
});
exports.previewImg = previewImg;

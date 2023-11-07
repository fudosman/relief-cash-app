const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { cloudinary_name, cloudinary_api_key, cloudinary_api_secret, } = require("../configs").env;

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

class CloudinaryService {
  static async uploadMedia(file) {
    let folder;
    let uploadOptions = {
      resource_type: "auto",
    };

    if (file.mimetype.startsWith("image")) {
      folder = "photos";
      // If the file is a Buffer, set the format option to "jpg"
      if (Buffer.isBuffer(file)) {
        uploadOptions.format = "jpg";
      }
    } else if (file.mimetype.startsWith("video")) {
      folder = "videos";
    } else if (file.mimetype.startsWith("audio")) {
      folder = "audios";
    } else if (file.mimetype.startsWith("application/pdf")) {
      folder = "pdfs";
    } else {
      folder = "others";
    }

    try {
      // If the file is a Buffer, upload the data directly
      if (Buffer.isBuffer(file)) {
        uploadOptions.folder = folder;
        uploadOptions.public_id = file.originalname;
        const result = await cloudinary.uploader.upload(file, uploadOptions);
        return result;
      }

      // Otherwise, upload the file from the local filesystem
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        resource_type: "auto",
      });

      // delete file from the local folder
      fs.unlinkSync(file.path);

      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  static async deleteMedia(mediaId) {
    try {
      const result = await cloudinary.uploader.destroy(mediaId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

module.exports = CloudinaryService;

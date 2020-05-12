const cloudinary = require('cloudinary');
const streamifier = require("streamifier");

// Function from cloudinary support https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
let streamUpload = (buffer) => {
    console.log("Eish should not be called")
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
            folder: "adPhotos"
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  module.exports = {streamUpload}
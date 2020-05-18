const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

// Function from cloudinary support https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
          folder: "adPhotos"
      },
      (error, result) => {
        if (result) {
          console.log("Cloudinary Function returened and CB Running")
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    console.log("Stream in streamUpload: ", stream)
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

  module.exports = {streamUpload}
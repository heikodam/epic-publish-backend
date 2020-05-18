// module.exports = {
//     streamUpload: (buffer) => {
//         console.log("Lekker in stream Upload mock")
//         return new Promise((resolve, reject) => {
//                 resolve({
//                     url: "fakeUrl",
//                     type: "upload",
//                     secur_url: "Fake Url",
//                     original_filename: "file",
//                     width: 800 
//                 })  
//         });
//       }
// }


let streamUpload = (buffer) => {
    console.log("Lekker in stream Upload mock")
    return new Promise((resolve, reject) => {
        resolve({
            url: "fakeUrl",
            type: "upload",
            secur_url: "Fake Url",
            original_filename: "file",
            width: 800 
        })
    //   streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  
    module.exports = {streamUpload}
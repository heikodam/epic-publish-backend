module.exports = {
    streamUpload: (buffer) => {
        console.log("Lekker in stream Upload mock")
        return new Promise((resolve, reject) => {
                resolve({
                    url: "fakeUrl",
                    type: "upload",
                    secur_url: "Fake Url",
                    original_filename: "file",
                    width: 800 
                })  
        });
      }
}
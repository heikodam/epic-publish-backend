module.exports = {
    v2:{
        uploader: {
            upload_stream(options, cb){
                return cb(null, {
                    url: "fakeUrl",
                    type: "upload",
                    secur_url: "Fake Url",
                    original_filename: "file",
                    width: 800 
                })
            },
    },
    
        
    }
}
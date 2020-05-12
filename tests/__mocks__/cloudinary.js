module.exports = {
    uploader: {
        upload_stream(){
            console.log("In Upload_Stream Mock")
            return {
                url: "fakeUrl",
                type: "upload",
                secur_url: "Fake Url",
                original_filename: "file",
                width: 800 
            }
        },
        // dest: {
        //     on(){
        //         return null
        //     }
        // }
    }
}
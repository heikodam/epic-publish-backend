module.exports = {
    createReadStream(a){
        console.log("Streamifiyer mock is running")
        return {
            pipe(a){
                return true
            }
        }
    },
    
}
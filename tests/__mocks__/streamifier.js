module.exports = {
    createReadStream(a){
        return {
            pipe(a){
                return true
            }
        }
    },
    
}
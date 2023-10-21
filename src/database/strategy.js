class Strategy{
    async save(data){
        throw new Error('Not Implemented Error')
    }

    async findAll(path, where){
        throw new Error('Not Implemented Error')
    }
}

module.exports = Strategy
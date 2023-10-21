//'Database' class is 'Context' in the 'Strategy' pattern.

class Database{
    constructor(){
        this._strategy
        this._instance
    }

    static get instance(){
        if (!this._instance) this._instance = new Database()
        return this._instance
    }

    set strategy(concrete){
        if (!concrete) throw new Error('NullPointer Exception')
        this._strategy = concrete
    }

    async save(data){
        return this._strategy.save(data)
    }

    async findAll(path, ...where){
        return this._strategy.findAll(path, ...where)
    }
}

module.exports = Database.instance
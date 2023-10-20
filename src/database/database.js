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

    async save(){
        this._strategy.save()
    }
}

module.exports = Database.instance
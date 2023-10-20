const Strategy = require("./strategy");

class Firestore extends Strategy{
    constructor(){
        super()
    }

    async save(){
        console.log('Salvo no firestore')
    }
}

module.exports = new Firestore()
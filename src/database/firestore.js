const Strategy = require("./strategy");
const { initializeApp } = require('firebase/app')
const { getFirestore, getDocs, doc, collection, addDoc, query, where } = require('firebase/firestore')

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

class Firestore extends Strategy {
    constructor() {
        super()
        this._app = initializeApp(firebaseConfig)
        this._db = getFirestore()
    }

    async save(data) {
        try {
            const { userData, collectionObj } = data
            const { name, subcollection, primaryKey } = collectionObj

            const query = await this._findDocs(name, primaryKey.name, '==', primaryKey.value)
            const docs = await query.docs

            const collectionRef = collection(this._db, name)

            if (subcollection && subcollection.isExist) {
                let a = docs.length < 1
                const documentRef = docs.length < 1 ? await addDoc(collectionRef, userData) : docs[0].ref
                //const documentRef = await addDoc(collectionRef, userData)
                const subcollectionRef = collection(documentRef, subcollection.name);
                return await addDoc(subcollectionRef, subcollection.subData)
            } else if(docs.length < 1) {
                return await addDoc(collectionRef, userData)
            }

            return docs[0]

        } catch (error) {
            throw error
        }
    }

    async findAll(path, ...whereParam) {
        try {
            const docs = await this._findDocs(path, ...whereParam)
            const data = docs.docs.map(doc => doc.data())
            return data
        } catch (error) {
            throw error
        }
    }

    async _findDocs(path, ...whereParam) {
        try {
            const collectionNames = path.split('/')
            const mainRef = collectionNames.shift()
            const deepRef = collection(this._db, mainRef, ...collectionNames)
            const queryResult = query(deepRef, where(...whereParam))
            const result = await getDocs(queryResult)
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Firestore()
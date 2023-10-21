const { initializeApp } = require('firebase/app')
const { getFirestore, setDoc, doc } = require('firebase/firestore')

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig)
    }

    async init() {
        const db = getFirestore()
        let a = Date.now()
        const docRef = doc(db, 'teste', a.toString());
        console.log(docRef)

        await setDoc(docRef, {
            first: 'Ada',
            last: 'Lovelace',
            born: 1815
        });
        console.log('done')
    }
}

module.exports = new Firebase()
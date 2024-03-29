import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBu5vbMDAqSD770RFsC8oyRGEhrSWisMOc",
    authDomain: "csa-vue.firebaseapp.com",
    projectId: "csa-vue",
    storageBucket: "csa-vue.appspot.com",
    messagingSenderId: "714152716410",
    appId: "1:714152716410:web:05370b8d17353ed4ffb3c3"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
var googleProvider = new firebase.auth.GoogleAuthProvider();
var microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

// collection references
const usersCollection = db.collection('users')
const companiesCollection = db.collection('companies')
const candidatesCollection = db.collection('candidates')
const reviewsCollection = db.collection('reviews')

// export utils/refs
export {
    db,
    auth,
    googleProvider,
    microsoftProvider,
    usersCollection,
    companiesCollection,
    candidatesCollection,
    reviewsCollection
}
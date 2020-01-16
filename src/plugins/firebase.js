import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_apiKey,
  authDomain: process.env.VUE_APP_FIREBASE_authDomain,
  databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
  projectId: process.env.VUE_APP_FIREBASE_projectId,
  storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
  appId: process.env.VUE_APP_FIREBASE_appId,
  measurementId: process.env.VUE_APP_FIREBASE_measurementId
}
firebase.initializeApp(config)

// firebase utils
const firestore = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {}
firestore.settings(settings)

// Write to emulator for testing purposes
const runOnFirebaseEmulator = process.env.VUE_APP_FIREBASE_runOnFirebaseEmulator
if (runOnFirebaseEmulator === 'true') {
  settings.ssl = false
  settings.host = 'localhost:8080'
  firestore.settings(settings)
}

// firebase collections
const customersCollection = firestore.collection('customers')

export { firestore, auth, currentUser, customersCollection }

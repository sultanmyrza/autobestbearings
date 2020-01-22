import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)

  const firestore = firebase.firestore()

  // date issue fix according to firebase
  const settings = Object({})
  firestore.settings(settings)

  // Write to emulator for testing purposes
  const runOnFirebaseEmulator = process.env.runOnFirebaseEmulator
  if (runOnFirebaseEmulator === 'true') {
    settings.ssl = false
    settings.host = 'localhost:8080'
    firestore.settings(settings)
  }
}

// firebase utils
const firestore = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

export async function getAnonymousUser() {
  if (auth.currentUser) {
    return auth.currentUser
  }

  try {
    const userCred = await auth.signInAnonymously()
    return userCred.user
  } catch (error) {
    return null
  }
}

// firebase collections
const customersCollection = firestore.collection('customers')

export { firestore, auth, currentUser, customersCollection }

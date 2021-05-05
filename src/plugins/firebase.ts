import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Appの初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

// 今回使用するAPI
export { firebase }
export const auth = firebase.auth()
export const firestore = firebase.firestore()
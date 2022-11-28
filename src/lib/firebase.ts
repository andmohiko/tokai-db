import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  serverTimestamp as getServerTimestamp,
  connectFirestoreEmulator,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(config)
export const db = getFirestore()
export const serverTimestamp = getServerTimestamp()
export const storage = getStorage()
export default firebaseApp

if (process.env.USE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

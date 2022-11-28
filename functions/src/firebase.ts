import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'gs://tokai-db.appspot.com',
})
export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()
export const bucket = admin.storage().bucket()

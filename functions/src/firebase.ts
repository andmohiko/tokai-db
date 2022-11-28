import * as admin from 'firebase-admin'
import { config } from 'firebase-functions'

const bucketId = config().storage.bucket

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: `gs://${bucketId}`,
})
export const db = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()

export const bucket = admin.storage().bucket(`gs://${bucketId}`)

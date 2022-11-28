import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { db, serverTimestamp, bucket } from '../firebase'
import SceneRepository from '../repositories/SceneRepository'
import TagRepository from '../repositories/TagRepository'
import { triggerOnce } from '../utils/triggerOnce'

const sceneRepository = new SceneRepository()
const tagRepository = new TagRepository()
const imagePath = 'images/scenes/'

const onCreateScene = functions.firestore.document('scenes/{sceneId}').onCreate(
  triggerOnce('onCreateScene', async (snap, context) => {
    const newValue = snap.data()
    if (!newValue) return

    const sceneId = context.params.sceneId

    try {
      const scene = await sceneRepository.fetchById(sceneId)
      if (!scene) return

      const batch = db.batch()

      // タグの更新
      for (const label of scene.tags) {
        const tag = await tagRepository.fetchByLabel(label)
        if (!tag) {
          return
        }

        tagRepository.updateByBatch(batch, tag.tagId, {
          scenesCount: admin.firestore.FieldValue.increment(1),
          updatedAt: serverTimestamp,
        })
      }

      // リサイズされた画像に置き換える
      const imageFilename = scene.screenshotURL.slice(85, 121)
      const resizedImageFilenamae = `${imageFilename}_640x360`
      const ref = bucket.file(`${imagePath}${resizedImageFilenamae}`)
      const [metadata] = await ref.getMetadata()
      const token = metadata.metadata.firebaseStorageDownloadTokens
      const resizedImageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketId}/o/${encodeURIComponent(
        `${imagePath}${resizedImageFilenamae}`,
      )}?alt=media&token=${token}`

      sceneRepository.updateByBatch(batch, scene.sceneId, {
        screenshotURL: resizedImageUrl,
        updatedAt: serverTimestamp,
      })

      await batch.commit()

      // 元画像の削除
      await bucket.file(`${imagePath}${imageFilename}`).delete()
    } catch (e) {
      console.error(e)
    }
  }),
)

export default onCreateScene

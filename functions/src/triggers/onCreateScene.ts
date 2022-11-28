import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { db, serverTimestamp, bucket } from '../firebase'
import SceneRepository from '../repositories/SceneRepository'
import TagRepository from '../repositories/TagRepository'
import { triggerOnce } from '../utils/triggerOnce'

const sceneRepository = new SceneRepository()
const tagRepository = new TagRepository()
const imagePath = '/images/scenes/'

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

      // 画像のリサイズ更新
      // 画像名の取得
      const imageFilename = scene.screenshotURL.slice(85, 121)
      const resizedImageFilenamae = `${imageFilename}_640x360`
      // リサイズ後の画像の検索
      const file = bucket.file(`${imagePath}${resizedImageFilenamae}`)
      // リンクの置き換え
      console.log(file)
      // 元画像の削除

      await batch.commit()
    } catch (e) {
      console.error(e)
    }
  }),
)

export default onCreateScene

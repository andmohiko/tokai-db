// import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { db, serverTimestamp } from '../firestore'
import SceneRepository from '../repositories/SceneRepository'
import TagRepository from '../repositories/TagRepository'
import { triggerOnce } from '../utils/triggerOnce'

const sceneRepository = new SceneRepository()
const tagRepository = new TagRepository()

const onCreateScene = functions.firestore.document('scenes/{sceneId}').onCreate(
  triggerOnce('onCreateScene', async (snap, context) => {
    const newValue = snap.data()
    if (!newValue) return

    const sceneId = context.params.sceneId

    try {
      const scene = await sceneRepository.fetchById(sceneId)
      if (!scene) return

      const batch = db.batch()
      scene.tags.forEach(async (label) => {
        const tag = await tagRepository.fetchByLabel(label)
        if (!tag) {
          return
        }

        tagRepository.updateByBatch(batch, tag.tagId, {
          scenesCount: admin.firestore.FieldValue.increment(1),
          updatedAt: serverTimestamp,
        })
      })
      await batch.commit()
    } catch (e) {
      console.error(e)
    }
  }),
)

export default onCreateScene

import * as admin from 'firebase-admin'

import { DocId, Scene, ScenesCollection, UpdateSceneFormDto } from '../entites'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumn = ['createdAt', 'deletedAt']

export default class SceneRepository {
  async fetchById(sceneId: DocId): Promise<Scene | undefined> {
    const doc = await db.collection(ScenesCollection).doc(sceneId).get()
    if (!doc) {
      return undefined
    }

    return {
      sceneId: doc.id,
      ...convertDate(doc.data()!, dateColumn),
    } as Scene
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    tagId: DocId,
    dto: UpdateSceneFormDto,
  ): void {
    const ref = db.collection(ScenesCollection).doc(tagId)
    batch.update(ref, {
      ...dto,
    })
  }
}

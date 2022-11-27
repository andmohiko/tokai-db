import { DocId, Scene, ScenesCollection } from '../entites'
import { db } from '../firestore'
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
}

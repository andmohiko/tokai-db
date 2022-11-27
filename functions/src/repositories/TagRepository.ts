import * as admin from 'firebase-admin'

import { DocId, Tag, TagsCollection, UpdateTagDto } from '../entites'
import { db } from '../firestore'
import { convertDate } from '../utils/date'

const dateColumn = ['createdAt', 'deletedAt']

export default class TagRepository {
  async fetchByLabel(label: string): Promise<Tag | undefined> {
    const snapshot = await db
      .collection(TagsCollection)
      .where('label', '==', label)
      .limit(1)
      .get()
    const doc = snapshot.docs[0]

    if (!doc.data()) {
      return undefined
    }

    return {
      tagId: doc.id,
      ...convertDate(doc.data(), dateColumn),
    } as Tag
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    tagId: DocId,
    dto: UpdateTagDto,
  ): void {
    const ref = db.collection(TagsCollection).doc(tagId)
    batch.update(ref, dto)
  }
}

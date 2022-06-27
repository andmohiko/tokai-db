import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  query,
  orderBy,
  Firestore,
  DocumentData
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Tag } from '@/entities'
import { isDefined } from '@/utils/type'
// import { convertDate } from '../utils/date'

const TagsCollection = 'tags'

export const useFetchTags = (db: Firestore) => {
  const fetchTags = () => {
    const [tags, setTags] = useState<Tag[]>()
    const [value, loading, error] = useCollection(
      collection(db, TagsCollection)
    )

    useEffect(() => {
      if (!value) return
      const tags = value.docs
        .map((doc) => {
          return tagFactory(doc)
        })
        .filter(isDefined)
      setTags(tags)
    }, [value])
    return tags
  }
  return fetchTags
}

const tagFactory = (doc: DocumentData): Tag | undefined => {
  const data = doc.data()
  if (!data) return

  return {
    tagID: doc.id,
    createdAt: data.createdAt,
    label: data.label,
    scenesCount: data.scenesCount,
    updatedAt: data.updatedAt
  }
}

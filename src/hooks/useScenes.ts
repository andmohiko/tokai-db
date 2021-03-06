import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  doc,
  query,
  orderBy,
  Firestore,
  DocumentData
} from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { CreateSceneDto, Scene } from '@/entities'
import { isDefined } from '@/utils/type'
// import { convertDate } from '../utils/date'

const ScenesCollection = 'scenes'

export const useScenes = (db: Firestore) => {
  const [scenes, setScenes] = useState<Scene[]>()
  const [value, loading, error] = useCollection(
    collection(db, ScenesCollection)
  )

  useEffect(() => {
    if (!value) return
    const scenes = value.docs
      .map((doc) => {
        return sceneFactory(doc)
      })
      .filter(isDefined)
    setScenes(scenes)
  }, [value])

  return scenes
}

export const useScene = (db: Firestore, docId: string) => {
  const [scene, setScene] = useState<Scene>()
  const [value, loading, error] = useDocument(doc(db, ScenesCollection, docId))

  useEffect(() => {
    if (!value) return
    setScene(sceneFactory(value))
  }, [value])

  return {
    scene,
    loading,
    error
  }
}

export const useCreateScene = (db: Firestore) => {
  const createScene = async (dto: CreateSceneDto) => {
    const sceneRef = await addDoc(collection(db, ScenesCollection), dto)
    return sceneRef.id
  }
  return createScene
}

const sceneFactory = (doc: DocumentData): Scene | undefined => {
  const data = doc.data()
  if (!data) return

  return {
    sceneId: doc.id,
    createdAt: data.createdAt,
    likes: data.likes,
    screenshotURL: data.screenshotURL,
    tags: data.tags,
    title: data.title,
    updatedAt: data.updatedAt
  }
}

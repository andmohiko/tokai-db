import * as admin from 'firebase-admin'

export type DocId = string

export const ScenesCollection = 'scenes'

export const TagsCollection = 'tags'

export interface Tag {
  tagID: DocId
  createdAt: Date
  label: string
  scenesCount: number
  updatedAt: Date
}

export interface TagUI {
  tagID: Tag['tagID']
  createdAt: Tag['createdAt']
  isActive: boolean
  label: Tag['label']
  scenesCount: Tag['scenesCount']
  updatedAt: Tag['updatedAt']
}

export interface Scene {
  sceneId: DocId
  createdAt: Date
  likes: number
  screenshotURL: string
  tags: Tag['label'][]
  title: string
  updatedAt: Date
  userId: DocId | null
  videoName: string
}

export interface UpdateSceneFormDto {
  updatedAt: admin.firestore.FieldValue
}

export interface UpdateTagFormDto {
  updatedAt: admin.firestore.FieldValue
}

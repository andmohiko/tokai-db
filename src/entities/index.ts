export type DocId = string

export interface Tag {
  tagId: DocId
  createdAt: Date
  label: string
  scenesCount: number
  updatedAt: Date
}

export interface Scene {
  sceneId: DocId
  createdAt: Date
  likes: number
  screenshotURL: string
  tags: Tag['label'][]
  title: string
  updatedAt: Date
}

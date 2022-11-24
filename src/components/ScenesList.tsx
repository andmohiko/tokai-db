import { useState, useEffect } from 'react'

import { LoadingOverlay, Pagination, SimpleGrid, Stack } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { SceneCard } from './SceneCard'

import { Scene, TagUI } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const ScenesCollection = 'scenes'

type Props = {
  tags: TagUI[]
}

export const ScenesList = ({ tags }: Props) => {
  const [scenes, setScenes] = useState<Scene[]>()
  const [page, onChange] = useState(1)
  const pagination = usePagination({
    total: 10,
    page,
    onChange,
  })
  const [value, loading, error] = useCollection(
    query(
      collection(db, ScenesCollection),
      orderBy('createdAt', 'desc')
    )
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

  if (loading || !scenes)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  if (!value || error)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  return (
    <Stack align="center">
      {tags[0].label}
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {scenes.map((s) => (
          <SceneCard key={s.sceneId} scene={s} />
        ))}
      </SimpleGrid>
      <Pagination
        page={pagination.active}
        onChange={pagination.next}
        total={10}
      />
    </Stack>
  )
}

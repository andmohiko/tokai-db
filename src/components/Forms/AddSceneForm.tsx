import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Group,
  Image,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { TagUI } from '~/entities'
import { useFileInput } from '~/hooks/useFileInput'
import { useCreateScene } from '~/hooks/useScenes'
import { serverTimestamp } from '~/lib/firebase'

const AddSceneSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  videoName: z.string().min(1, { message: '動画名を入力してください' }),
})

type AddSceneType = z.infer<typeof AddSceneSchema>

type Props = {
  tags: TagUI[]
  onClose: () => void
}

export const AddSceneForm = ({ tags, onClose }: Props) => {
  const createScene = useCreateScene()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddSceneType>({ resolver: zodResolver(AddSceneSchema) })

  const [fileURL, onChange] = useFileInput('/images/scenes/')
  const [selectedTags, setSelectedTags] = useState<string[]>()

  const onSubmit: SubmitHandler<AddSceneType> = (data) => {
    console.log({
      createdAt: serverTimestamp,
      likes: 0,
      screenshotURL: fileURL,
      tags: selectedTags,
      title: data.title,
      updatedAt: serverTimestamp,
      videoName: data.videoName,
    })
    createScene({
      createdAt: serverTimestamp,
      likes: 0,
      screenshotURL: fileURL,
      tags: selectedTags,
      title: data.title,
      updatedAt: serverTimestamp,
      videoName: data.videoName,
    })
    onClose()
  }

  return (
    <Stack spacing="xl">
      <Title order={2}>スクショを追加する</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="lg">
          <Stack>
            <Dropzone
              onDrop={onChange}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              {fileURL ? (
                <Image src={fileURL} alt="" />
              ) : (
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: 220, pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload size={50} stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={50} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                  </Dropzone.Idle>

                  <Text size="xl" inline>
                    画像をアップロードしてください
                  </Text>
                </Group>
              )}
            </Dropzone>
            <TextInput
              label="この場面に名前をつけるなら？"
              placeholder="クシシウ〜ウ"
              error={errors.title?.message}
              {...register('title')}
            />
            <TextInput
              label="どの動画？"
              placeholder="文理対決でろ過器作るやつ"
              error={errors.videoName?.message}
              {...register('videoName')}
            />
            <MultiSelect
              data={tags.map(t => {
                return {
                  value: t.label,
                  label: t.label
                }
              })}
              label="誰が映ってますか？"
              onChange={setSelectedTags}
            />
          </Stack>
          <Button type="submit" loading={isSubmitting}>
            作成する
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

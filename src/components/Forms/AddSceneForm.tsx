import { zodResolver } from '@hookform/resolvers/zod'
import {
  Group,
  Text,
  Button,
  Stack,
  TextInput,
  Title,
  Image,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { UploadImage } from './UploadImage'

import { useFileInput } from '~/hooks/useFileInput'
import { serverTimestamp } from '~/lib/firebase'

const AddTagSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  videoName: z.string().min(1, { message: '動画名を入力してください' }),
})

type AddTagType = z.infer<typeof AddTagSchema>

export const AddSceneForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTagType>({ resolver: zodResolver(AddTagSchema) })

  const [fileURL, onChange] = useFileInput('/scenes/')

  const onSubmit: SubmitHandler<AddTagType> = (data) => {
    console.log('submit', {
      ...data,
    })
  }

  return (
    <Stack spacing="xl">
      <Title order={2}>スクショを追加する</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="lg">
          <Stack>
            <TextInput
              label="タイトル"
              placeholder="クシシウ〜ウ"
              error={errors.title?.message}
              {...register('title')}
            />
            <TextInput
              label="動画名"
              placeholder="文理対決でろ過器作るやつ"
              error={errors.videoName?.message}
              {...register('videoName')}
            />

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
          </Stack>
          <Button type="submit" loading={isSubmitting}>
            作成する
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

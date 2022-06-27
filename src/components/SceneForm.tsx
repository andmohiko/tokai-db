import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { TagsSelector } from './TagsSelector'
import { CreateSceneFormDto, Scene } from '@/entities'
import { Tag as TagType, TagUI } from '@/entities'
import { useCreateScene } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import { useFileInput } from '@/hooks/useFileInput'

interface Props {
  tagsMaster: TagType[]
  scene?: Scene
}

export const SceneForm = ({ tagsMaster }: Props): React.ReactElement => {
  const [file, setFile] = useFileInput('images/scenes')
  const toast = useToast()
  const createScene = useCreateScene(db)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const selectableTags: TagUI[] = tagsMaster.map((tag) => {
    return {
      ...tag,
      isActive: false
    }
  })
  const [tags, setTags] = useState(selectableTags)
  const selectTag = (selectedTag: TagUI) => {
    setTags(
      tags.map((tag) => {
        if (selectedTag.tagID !== tag.tagID) return tag
        return {
          ...selectedTag,
          isActive: !selectedTag.isActive
        }
      })
    )
  }

  const onSubmit = async (formInput: CreateSceneFormDto) => {
    const sceneId = await createScene({
      ...formInput,
      createdAt: serverTimestamp(),
      likes: 0,
      screenshotURL: file,
      tags: tags.filter((tag) => tag.isActive).map((tag) => tag.label),
      updatedAt: serverTimestamp()
    })
    if (sceneId) {
      toast({
        title: '保存しました',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box border="1px solid blue">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={4}>
          <FormLabel htmlFor="title">タイトル</FormLabel>
          <Input
            id="title"
            {...register('title')}
            placeholder="クシシウ〜ウ"
            backgroundColor="white"
            w={400}
            type="text"
          />
        </FormControl>
        <TagsSelector tags={tags} selectTag={selectTag} />
        <Uploader file={file} setFile={setFile} />
        <Button mt={2} isLoading={isSubmitting} type="submit">
          保存する
        </Button>
      </form>
    </Box>
  )
}

export type ImageSelectorProps = {
  file?: string
  setFile: any
}

const Uploader = ({
  file,
  setFile
}: ImageSelectorProps): React.ReactElement => {
  return (
    <FormControl mt={4}>
      <FormLabel htmlFor="screenshotURL">スクショ</FormLabel>
      <Input onChange={setFile} type="file" />
      {file && <Image w={200} h={160} src={file} />}
    </FormControl>
  )
}

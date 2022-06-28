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
import { Tag as TagType, TagUI, CreateTagFormDto } from '@/entities'
import { useCreateScene } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import { useFileInput } from '@/hooks/useFileInput'
import { useCreateTag } from '@/hooks/useTags'

interface Props {
  tagsMaster: TagType[]
}

export const TagForm = ({ tagsMaster }: Props): React.ReactElement => {
  const toast = useToast()
  const createTag = useCreateTag(db)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (formInput: CreateTagFormDto) => {
    const tagId = await createTag({
      ...formInput,
      createdAt: serverTimestamp(),
      scenesCount: 0,
      updatedAt: serverTimestamp()
    })
    if (tagId) {
      toast({
        title: '保存しました',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={4}>
          <FormLabel htmlFor="label">タイトル</FormLabel>
          <Input
            id="label"
            {...register('label')}
            placeholder="文理対決"
            backgroundColor="white"
            w={400}
            type="text"
          />
        </FormControl>
        <Button mt={2} isLoading={isSubmitting} type="submit">
          保存する
        </Button>
      </form>
    </Box>
  )
}

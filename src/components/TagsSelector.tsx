import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { TagButton } from '@/components/TagButton'
import { Tag, TagUI } from '@/entities'

interface Props {
  tags: TagUI[]
  selectTag: any
}

export const TagsSelector = ({
  tags,
  selectTag
}: Props): React.ReactElement => {
  return (
    <Flex>
      {tags.map((tag: TagUI) => (
        <Flex key={tag.tagID} mr={1}>
          <TagButton tag={tag} selectTag={selectTag} />
        </Flex>
      ))}
    </Flex>
  )
}

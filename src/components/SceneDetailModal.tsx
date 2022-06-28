import React, { useState } from 'react'

import {
  Button,
  Box,
  Flex,
  Image,
  Input,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text
} from '@chakra-ui/react'
import { Scene } from '@/entities'
import { TagLabel } from '@/components/TagButton'

interface Props {
  isOpen: boolean
  onClose: () => void
  scene: Scene
}

export const SceneDetailModal = ({
  isOpen,
  onClose,
  scene
}: Props): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(4px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{scene.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={scene.screenshotURL} />
          <Flex mt={4}>
            {scene.tags.map((tag) => {
              return (
                <Flex key={tag} mr={1}>
                  <TagLabel tagLabel={tag} />
                </Flex>
              )
            })}
          </Flex>
          <Text fontSize="xl" mt={4}>
            {scene.videoName}
          </Text>
          <Text fontSize="lg" mt={4}>
            いいね: {scene.likes}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

import Image from 'next/image'
import { Box, Button, Img, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
}

const SceneCard = ({ scene }): React.ReactElement => {
  return (
    <Box>
      <Img src={scene}></Img>
    </Box>
  )
}

export default SceneCard

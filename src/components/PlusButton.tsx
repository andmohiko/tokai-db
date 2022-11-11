import { ActionIcon } from '@mantine/core'
import { AiOutlinePlus } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <ActionIcon
      color="blue"
      size="xl"
      radius="xl"
      variant="filled"
      onClick={onClick}
    >
      <AiOutlinePlus size={24} />
    </ActionIcon>
  )
}

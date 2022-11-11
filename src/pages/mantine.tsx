import { Stack } from '@mantine/core'

import { ScenesList } from '~/components/ScenesList'
// import { AddTagForm } from '~/components/Forms/AddTagForm'
import { SimpleLayout } from '~/components/SimpleLayout'

const newPage = () => {
  return (
    <SimpleLayout>
      <Stack>
        {/* <AddTagForm /> */}
        <ScenesList />
      </Stack>
    </SimpleLayout>
  )
}

export default newPage

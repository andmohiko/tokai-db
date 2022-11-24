import { Stack } from '@mantine/core'

import { ScenesList } from '~/components/ScenesList'
import { SimpleLayout } from '~/components/SimpleLayout'

const IndexPage = () => {
  return (
    <SimpleLayout>
      <Stack>
        {/* <AddTagForm /> */}
        <ScenesList />
      </Stack>
    </SimpleLayout>
  )
}

export default IndexPage

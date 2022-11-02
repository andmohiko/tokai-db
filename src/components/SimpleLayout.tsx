import { Stack } from '@mantine/core'

import { HeadComponent } from '~/components/Head'

type Props = {
  children: React.ReactNode
}

export const SimpleLayout = ({ children }: Props) => (
  <div>
    <HeadComponent />
    <Stack justify="center" align="center" style={{ minHeight: '100vh' }}>
      {children}
    </Stack>
  </div>
)

import { Loader, Stack } from '@mantine/core'

export const LoadingScreen = () => (
  <Stack
    justify="center"
    align="center"
    style={{
      height: '100vh',
    }}
  >
    <Loader size={60} />
  </Stack>
)

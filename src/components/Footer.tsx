import { useTheme } from "@chakra-ui/react"
import { Anchor, Stack, Text } from "@mantine/core"

const Footer = (): React.ReactElement => {
  const theme = useTheme()
  return (
    <Stack>
      <hr />
      <Text
        style={{
          color: theme.colors.gray[4],
          textAlign: 'center'
        }}
      >
        <Anchor href='https://www.notion.so/andmohiko/f6e879d78c20411c83a1cd0830158e03'>利用規約</Anchor>
        &nbsp;|&nbsp;
        <Anchor href='https://forms.gle/ZhVECm34dnmzJBYK9'>お問い合せ</Anchor>
      </Text>
      <p
        style={{
          textAlign: 'center'
        }}
      >
        <small>© 2022 andmohiko</small>
      </p>
    </Stack>
  )
}

export default Footer

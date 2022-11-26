import { CopyButton, ActionIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons'

type Props = {
  shareUrl: string
}

export const CopyLinkButton = ({ shareUrl }: Props) => {
  const theme = useMantineTheme()
  return (
    <CopyButton value={shareUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'コピー完了' : 'コピーする'}
          withArrow
          position="right"
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            onClick={copy}
            style={{
              border: '1px solid',
              borderColor: copied ? theme.colors.teal[4] : theme.colors.gray[5],
              fontSize: 12,
              gap: 4,
              padding: 0,
              width: 120,
            }}
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            リンクコピー
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}

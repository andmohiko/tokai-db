import { Button } from '@mantine/core'
import { IconBrandTwitter } from '@tabler/icons'

type Props = {
  shareUrl: string
}

const hashtags = ['東海DB', '東海オンエア']

export const TweetButton = ({ shareUrl }: Props) => {
  const createShareUrl = (url: string): string => {
    const shareUrl = new URL('http://twitter.com/share')
    const urlParams = [
      ['url', url],
      ['hashtags', hashtags.join(',')],
    ]
    const params = new URLSearchParams(urlParams)
    shareUrl.search = params.toString()
    return shareUrl.toString()
  }

  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={createShareUrl(shareUrl)}
      leftIcon={<IconBrandTwitter size={15} />}
      styles={(theme) => ({
        root: {
          backgroundColor: '#00acee',
          border: 0,
          fontSize: 12,
          height: 28,
          paddingLeft: 10,
          paddingRight: 10,
          width: 100,

          '&:hover': {
            backgroundColor: theme.fn.darken('#00acee', 0.05),
          },
        },

        leftIcon: {
          marginRight: 6,
        },
      })}
    >
      ツイート
    </Button>
  )
}

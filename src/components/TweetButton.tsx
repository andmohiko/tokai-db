import { Button } from '@mantine/core'
import { IconBrandTwitter } from '@tabler/icons'

export const TweetButton = () => {
  const createShareUrl = (url: string): string => {
    const shareUrl = new URL('http://twitter.com/share')
    const urlParams = [['url', url]]
    const params = new URLSearchParams(urlParams)
    shareUrl.search = params.toString()
    return shareUrl.toString()
  }

  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={createShareUrl('#')}
      leftIcon={<IconBrandTwitter size={15} />}
      styles={(theme) => ({
        root: {
          backgroundColor: '#00acee',
          border: 0,
          fontSize: 12,
          height: 22,
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

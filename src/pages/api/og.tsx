import { ImageResponse } from '@vercel/og'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasBgUrl = searchParams.has('bgUrl')
    const bgUrl = hasBgUrl && searchParams.get('bgUrl')

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: bgUrl ? `url(${bgUrl})` : '#999',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>あああああああああああああああいいいいいいいいいいい</p>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    )
  } catch (e: any) {
    console.error(e.message)
    return new Response('OGP画像の生成に失敗', { status: 500 })
  }
}

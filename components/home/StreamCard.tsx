import { Box, Flex, Text } from 'components/primitives'
import { FC } from 'react'
import { useRouter } from 'next/router'

type Stream = {
  id: string
  title: string
  viewerCount: number
  thumbnailUrl: string
  streamerName: string
}

type Props = {
  streams?: Stream[] | null
  loading?: boolean
}

export const StreamCard: FC<Props> = ({ streams = [], loading }) => {
  const router = useRouter()

  if (loading) {
    return (
      <Flex align="center" justify="center" css={{ py: '$5' }}>
        <Text>Loading streams...</Text>
      </Flex>
    )
  }

  if (!streams || streams.length === 0) {
    return (
      <Flex align="center" justify="center" css={{ py: '$5' }}>
        <Text>No active streams</Text>
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      css={{
        gap: 24,
      }}
    >
      <Flex justify="between" css={{ gap: 24 }}>
        <Text style="h4" as="h4">
          Live Streams
        </Text>
      </Flex>

      <Flex
        css={{
          gap: 20,
          overflowX: 'auto',
          width: '100%',
        }}
      >
        {streams.map((stream) => (
          <Box
            key={stream.id}
            onClick={() => router.push('/ethereum/livestream/live')}
            css={{
              flex: '0 0 300px',
              borderRadius: 12,
              overflow: 'hidden',
              background: '$neutralBgSubtle',
              position: 'relative',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 300ms ease-in-out',
              },
            }}
          >
            <Box
              css={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                overflow: 'hidden',
              }}
            >
              <img
                src={stream.thumbnailUrl}
                alt={stream.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Flex
                css={{
                  position: 'absolute',
                  bottom: '$2',
                  left: '$2',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '$1 $2',
                  borderRadius: '$sm',
                }}
              >
                <Text css={{ color: 'white', fontSize: '12px' }}>
                  {stream.viewerCount.toLocaleString()} viewers
                </Text>
              </Flex>
            </Box>
            <Box css={{ p: 16 }}>
              <Text style="subtitle1" css={{ mb: 4, fontWeight: 600 }}>
                {stream.streamerName}
              </Text>
              <Text style="body2" css={{ color: '$gray11' }}>
                {stream.title}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
} 
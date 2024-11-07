import { useTrendingMints } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import { Head } from 'components/Head'
import Layout from 'components/Layout'
import ChainToggle from 'components/common/ChainToggle'
import LoadingSpinner from 'components/common/LoadingSpinner'
import MintTypeSelector, {
  MintTypeOption,
} from 'components/common/MintTypeSelector'
import MintsPeriodDropdown, {
  MintsSortingOption,
} from 'components/common/MintsPeriodDropdown'
import { Box, Flex, Text, Grid } from 'components/primitives'
import { ChainContext } from 'context/ChainContextProvider'
import { useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { NORMALIZE_ROYALTIES } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import supportedChains, { DefaultChain } from 'utils/chains'
import fetcher from 'utils/fetcher'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

type ChatMessage = {
  id: number
  username: string
  message: string
  timestamp: Date
  position?: number
}

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    const messages = [
      "Amazing stream! 🔥",
      "When is the next drop?",
      "Love the new collection",
      "GM everyone!",
      "Floor price is mooning 🚀",
      "Who's copping?",
      "This is incredible",
      "Can't wait for the reveal",
      "Wen mint?",
      "Best NFT stream!"
    ]
    
    const usernames = [
      "NFT_Whale",
      "crypto_guru",
      "artCollector",
      "web3_native",
      "diamond_hands",
      "nft_hunter",
      "moon_boy",
      "rare_seeker",
      "pixel_lord",
      "eth_maxi"
    ]

    const addNewMessage = () => {
      const newMessage = {
        id: Date.now(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date()
      }

      setChatMessages(prev => [...prev.slice(-50), newMessage]) // Keep last 50 messages
    }

    // Add new message every 2-4 seconds
    const interval = setInterval(() => {
      addNewMessage()
    }, 2000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: 24,
          height: '100%',
          background: '$gray1',
          '@bp800': {
            p: '$3',
          },
        }}
      >
        <Flex direction="column" css={{ gap: '$4', height: '100%' }}>
          {/* Header Area */}
          <Flex 
            justify="between" 
            align="center" 
            css={{
              gap: '$4',
              flexDirection: 'row',
              '@bp800': {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            }}
          >
            <Text style="h4" as="h4">
              Live Stream
            </Text>
            
            {/* Stream Stats */}
            <Text css={{ color: '$gray11' }}>1.2k watching</Text>
          </Flex>

          {/* Main Content */}
          <Flex 
            direction="column" 
            css={{ 
              gap: '$4',
              height: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {/* Video Area */}
            <Box css={{
              background: '$gray3',
              borderRadius: '$lg',
              aspectRatio: '16/9',
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              maxHeight: '70vh',
              margin: '$4',
            }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <source src="/startingSoon.mp4" type="video/mp4" />
              </video>
              
              {/* Floating Comments */}
              <Box css={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '300px',
                pointerEvents: 'none',
                padding: '20px',
              }}>
                {chatMessages.slice(-8).map((msg, index) => (
                  <Box
                    key={msg.id}
                    css={{
                      position: 'absolute',
                      top: `${(index * 12) + 5}%`,
                      right: '20px',
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      maxWidth: '280px',
                      animation: 'slideIn 0.3s ease-out',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '@keyframes slideIn': {
                        from: { transform: 'translateX(100%)', opacity: 0 },
                        to: { transform: 'translateX(0)', opacity: 1 }
                      },
                    }}
                  >
                    <Text css={{ 
                      '& span:first-child': {
                        color: '$blue9',
                        fontWeight: 500
                      },
                      '& span:last-child': {
                        color: 'rgba(255,255,255,0.9)'
                      }
                    }}>
                      <span>{msg.username}</span>
                      <span> {msg.message}</span>
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* Stream Info Overlay */}
              <Box css={{
                position: 'absolute',
                top: '$4',
                left: '$4',
                right: '$4',
                p: '$3',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '$lg',
                '@bp800': {
                  top: '$2',
                  left: '$2',
                  right: '$2',
                },
              }}>
                <Flex justify="between" align="center">
                  <Box>
                    <Text style="h6" css={{ color: '$gray12', marginBottom: '$2' }}>Crypto Homies Genesis Mint</Text>
                    <Text style="body2" css={{ color: '$gray11' }}>Trading NFTs Live</Text>
                  </Box>
                  <Text css={{ color: '$gray11' }}>1.2k watching</Text>
                </Flex>
              </Box>
            </Box>

            {/* Chat Input */}
            <Flex css={{ 
              gap: '$2',
              marginBottom: '$4'
            }}>
              <Box css={{ 
                flex: 1,
                position: 'relative',
              }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && inputMessage.trim()) {
                      const newMessage = {
                        id: Date.now(),
                        username: 'You',
                        message: inputMessage.trim(),
                        timestamp: new Date()
                      }
                      setChatMessages(prev => [...prev.slice(-50), newMessage])
                      setInputMessage('')
                    }
                  }}
                  placeholder="Type a message..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--colors-gray7)',
                    background: 'var(--colors-gray3)',
                    color: 'var(--colors-gray12)',
                    outline: 'none',
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

type MintsSchema =
  paths['/collections/trending-mints/v1']['get']['responses']['200']['schema']

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    mints: MintsSchema
  }
}> = async ({ res, params }) => {
  const mintsQuery: paths['/collections/trending-mints/v1']['get']['parameters']['query'] =
    {
      limit: 20,
      period: '24h',
      type: 'any',
    }

  const chainPrefix = params?.chain || ''

  const { reservoirBaseUrl } =
    supportedChains.find((chain) => chain.routePrefix === chainPrefix) ||
    DefaultChain

  const query = { ...mintsQuery, normalizeRoyalties: NORMALIZE_ROYALTIES }

  const response = await fetcher(
    `${reservoirBaseUrl}/collections/trending-mints/v1`,
    query,
    {
      headers: {
        'x-api-key': process.env.RESERVOIR_API_KEY || '',
      },
    }
  )

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=60'
  )

  return {
    props: { ssr: { mints: response.data } },
  }
}

export default IndexPage

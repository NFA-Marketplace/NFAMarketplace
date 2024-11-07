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
import { format } from 'date-fns'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  
  // Mock data for upcoming streams
  const upcomingStreams = [
    {
      id: 1,
      title: "Crypto Homies Genesis Mint",
      date: new Date('2024-04-15T18:00:00'),
      thumbnail: "https://placeholder.co/400x225",
      viewers: 1200,
      status: 'upcoming',
    },
    {
      id: 2,
      title: "Azuki Special Mint",
      date: new Date('2024-04-15T20:00:00'),
      thumbnail: "https://placeholder.co/400x225",
      viewers: 850,
      status: 'live',
    },
    // Add more mock streams as needed
  ]

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: '$4',
          m: '$4',
          height: '100%',
          background: '$gray1',
          borderRadius: '$lg',
          '@bp800': {
            p: '$3',
          },
        }}
      >
        <Flex direction="column" css={{ gap: '$4' }}>
          {/* Header */}
          <Flex 
            justify="between" 
            align="center" 
            css={{
              gap: '$4',
              mb: '$4',
              '@bp800': {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            }}
          >
            <Text style="h5" as="h4">Upcoming Streams</Text>
            <Box css={{ 
              background: '$yellow3', 
              p: '$2',
              borderRadius: '$lg',
              '@bp800': {
                width: '100%',
              },
            }}>
              <Flex align="center" css={{ gap: '$2' }}>
                <Text style="body2">Filter by:</Text>
                <Box css={{ 
                  background: '$gray4', 
                  px: '$2',
                  py: '6px',
                  borderRadius: '$lg',
                  cursor: 'pointer',
                }}>
                  <Text style="body2">This Week</Text>
                </Box>
                <Box css={{ 
                  px: '$2', 
                  py: '6px',
                  borderRadius: '$lg',
                  cursor: 'pointer',
                }}>
                  <Text style="body2">Next Week</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>

          {/* Stream Grid */}
          <Grid css={{
            gap: '$3',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            '@bp800': {
              gridTemplateColumns: '1fr 1fr',
            },
            '@bp600': {
              gridTemplateColumns: '1fr',
            },
          }}>
            {upcomingStreams.map((stream) => (
              <Box 
                key={stream.id}
                css={{
                  background: '$gray3',
                  borderRadius: '$lg',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {/* Thumbnail */}
                <Box css={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  background: '$gray4',
                }}>
                  <Flex 
                    align="center" 
                    justify="center" 
                    css={{ 
                      height: '100%',
                      color: '$gray11' 
                    }}
                  >
                    <Text style="body2">Stream Thumbnail</Text>
                  </Flex>
                  
                  {/* Status Badge */}
                  <Box css={{
                    position: 'absolute',
                    top: '$1',
                    right: '$1',
                    background: stream.status === 'live' ? '$red9' : '$gray12',
                    px: '$2',
                    py: '4px',
                    borderRadius: '$lg',
                  }}>
                    <Text style="body2" css={{ color: 'white', textTransform: 'uppercase' }}>
                      {stream.status}
                    </Text>
                  </Box>
                </Box>

                {/* Stream Info */}
                <Box css={{ p: '$2' }}>
                  <Text style="subtitle1" css={{ mb: '$1' }}>{stream.title}</Text>
                  <Flex justify="between" align="center">
                    <Text style="body2" css={{ color: '$gray11' }}>
                      {format(stream.date, 'MMM d, h:mm a')}
                    </Text>
                    <Flex align="center" css={{ gap: '$1' }}>
                      <Box css={{ 
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: stream.status === 'live' ? '$red9' : '$gray8',
                      }} />
                      <Text style="body2" css={{ color: '$gray11' }}>
                        {stream.viewers.toLocaleString()}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Empty State */}
          {upcomingStreams.length === 0 && (
            <Flex 
              align="center" 
              justify="center" 
              direction="column" 
              css={{ 
                height: '300px',
                gap: '$3',
                background: '$gray3',
                borderRadius: '$lg',
              }}
            >
              <Text style="subtitle1" css={{ color: '$gray11' }}>No Upcoming Streams</Text>
              <Text style="body2" css={{ color: '$gray10' }}>Check back later for new streams</Text>
            </Flex>
          )}
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

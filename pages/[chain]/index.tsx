import { paths } from '@reservoir0x/reservoir-sdk'
import { Head } from 'components/Head'
import Layout from 'components/Layout'
import { Footer } from 'components/home/Footer'
import { Box, Button, Flex, Text } from 'components/primitives'
import { ChainContext } from 'context/ChainContextProvider'
import { useMarketplaceChain, useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useState,
} from 'react'
import supportedChains, { DefaultChain } from 'utils/chains'
import * as Tabs from '@radix-ui/react-tabs'
import {
  useTrendingCollections,
  useTrendingMints,
} from '@reservoir0x/reservoir-kit-ui'
import ChainToggle from 'components/common/ChainToggle'
import CollectionsTimeSelector, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeSelector'
import MintsPeriodDropdown, {
  MintsSortingOption,
} from 'components/common/MintsPeriodDropdown'
import { FeaturedCards } from 'components/home/FeaturedCards'
import { TabsContent, TabsList, TabsTrigger } from 'components/primitives/Tab'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import { MintRankingsTable } from 'components/rankings/MintRankingsTable'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import fetcher from 'utils/fetcher'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { styled } from 'stitches.config'
import { TopTraders } from 'components/home/TopTraders'
import { StreamCard } from 'components/home/StreamCard'

type TabValue = 'collections' | 'mints'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ScrollButton = styled('button', {
  display: 'none',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: '$gray3',
  border: 'none',
  padding: '$3',
  borderRadius: '$round',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray12',
  '&:hover': {
    background: '$gray4',
  },
  variants: {
    direction: {
      left: { left: 0 },
      right: { right: 0 },
    },
  },
})

const Home: NextPage<Props> = ({ ssr }) => {
  const router = useRouter()
  const marketplaceChain = useMarketplaceChain()
  const isMounted = useMounted()

  // not sure if there is a better way to fix this
  const { theme: nextTheme } = useTheme()
  const [theme, setTheme] = useState<string | null>(null)
  useEffect(() => {
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }, [nextTheme])

  const isSSR = typeof window === 'undefined'
  const isSmallDevice = useMediaQuery({ query: '(max-width: 800px)' })

  const [tab, setTab] = useState<TabValue>('collections')
  const [sortByTime, setSortByTime] = useState<CollectionsSortingOption>('24h')

  const [sortByPeriod, setSortByPeriod] = useState<MintsSortingOption>('24h')

  let mintsQuery: Parameters<typeof useTrendingMints>['0'] = {
    limit: 20,
    period: sortByPeriod,
    type: 'any',
  }

  const { chain, switchCurrentChain } = useContext(ChainContext)

  const [isChangingChain, setIsChangingChain] = useState(false)

  useEffect(() => {
    if (router.query.chain && isChangingChain) {
      let chainIndex: number | undefined
      for (let i = 0; i < supportedChains.length; i++) {
        if (supportedChains[i].routePrefix == router.query.chain) {
          chainIndex = supportedChains[i].id
        }
      }
      if (chainIndex !== -1 && chainIndex) {
        switchCurrentChain(chainIndex)
        setIsChangingChain(false)
        window.location.href = `/${router.query.chain}`
      }
    }
  }, [router.query.chain, isChangingChain])

  // Pass this to ChainToggle
  const handleChainChange = () => {
    setIsChangingChain(true)
  }

  const {
    data: trendingCollections,
    isValidating: isTrendingCollectionsValidating,
  } = useTrendingCollections(
    {
      limit: 20,
      sortBy: 'volume',
      period: sortByTime,
    },
    chain.id,
    {
      fallbackData: ssr.trendingCollections,
      keepPreviousData: true,
    }
  )

  const {
    data: featuredCollections,
    isValidating: isFeaturedCollectionsValidating,
  } = useTrendingCollections(
    {
      limit: 20,
      sortBy: 'sales',
      period: '24h',
    },
    chain.id,
    {
      fallbackData: ssr.featuredCollections,
      keepPreviousData: true,
    }
  )

  const { data: trendingMints, isValidating: isTrendingMintsValidating } =
    useTrendingMints({ ...mintsQuery }, chain.id, {
      fallbackData: ssr.trendingMints,
      keepPreviousData: true,
    })

  let volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey'] = '1day'

  switch (sortByTime) {
    case '7d':
      volumeKey = '7day'
      break
    case '24h':
      volumeKey = '1day'
      break
    default:
      volumeKey = '1day'
  }

  const dummyStreams = [
    {
      id: '1',
      title: 'Live NFT Minting Event - New Collection Drop! 🚀',
      viewerCount: 1234,
      thumbnailUrl: 'https://picsum.photos/seed/stream1/400/225',
      streamerName: 'CryptoArtist_Pro'
    },
    {
      id: '2',
      title: 'Trading Rare NFTs - Join the Action 💎',
      viewerCount: 856,
      thumbnailUrl: 'https://picsum.photos/seed/stream2/400/225',
      streamerName: 'NFT_Trader'
    },
    {
      id: '3',
      title: 'Exclusive Bored Ape Showcase 🐵',
      viewerCount: 2100,
      thumbnailUrl: 'https://picsum.photos/seed/stream3/400/225',
      streamerName: 'ApeCollector'
    },
    {
      id: '4',
      title: 'Live Art Creation - Watch the Process! 🎨',
      viewerCount: 567,
      thumbnailUrl: 'https://picsum.photos/seed/stream4/400/225',
      streamerName: 'DigitalArtist'
    },
    {
      id: '5',
      title: 'NFT Market Analysis & Tips 📊',
      viewerCount: 1567,
      thumbnailUrl: 'https://picsum.photos/seed/stream5/400/225',
      streamerName: 'CryptoAnalyst'
    }
  ]

  const [streams, setStreams] = useState<any[]>([])
  const [loadingStreams, setLoadingStreams] = useState(true)

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setStreams(dummyStreams)
      setLoadingStreams(false)
    }, 1000)
  }, [])

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: 24,
          height: '100%',
          background: '$neutralBg',
          '@bp800': {
            px: '$5',
          },
          '@xl': {
            px: '$6',
          },
        }}
      >
        {/* Hero Section */}
        <Box
          css={{
            mb: '40px',
            pt: '20px',
            '@bp800': {
              mb: 80,
              pt: 40,
            },
          }}
        >
          <Flex
            direction="column"
            align="center"
            css={{
              textAlign: 'center',
              gap: '$4',
              mb: '$4',
              px: '$3',
              '@bp800': {
                mb: '$6',
              },
            }}
          >
            <Text
              style="h2"
              css={{
                fontSize: '32px',
                '@bp800': {
                  fontSize: '60px',
                },
              }}
            >
              Explore, collect, and sell NFTs
            </Text>
            <Text style="body1" css={{ color: '$gray11', maxWidth: 600 }}>
              The world's largest digital marketplace for crypto collectibles and non-fungible tokens
            </Text>
          </Flex>
        </Box>

        {/* Top Traders Section */}
        <Box css={{ mb: '40px', '@bp800': { mb: 80 } }}>
          <Flex
            justify="between"
            align="center"
            css={{
              gap: 24,
              mb: '$4',
              px: '$3',
              '@bp800': {
                px: 24,
              },
            }}
          >
            <Text style="h4" as="h4">
              Top Traders
            </Text>
            <ChainToggle onChainChange={handleChainChange} />
          </Flex>
          <Box
            css={{
              overflowX: 'auto',
              px: '$3',
              '@bp800': {
                px: 24,
              },
              '& > div': {
                display: 'flex',
                gap: 20,
                '& > div': {
                  flex: '0 0 300px',
                  '@bp800': {
                    flex: 1,
                  },
                },
              },
            }}
          >
            <FeaturedCards
              collections={trendingCollections?.slice(0, 5) || null}
            />
          </Box>
        </Box>

        {/* Live Streams Section */}
        <Box css={{ mb: 80 }}>
          <Box css={{ p: 24 }}>
            <StreamCard streams={streams} loading={loadingStreams} />
          </Box>
        </Box>

        {/* Trending Section */}
        <Box
          css={{
            p: '$3',
            '@bp800': {
              p: 24,
            },
          }}
        >
          <Tabs.Root
            onValueChange={(tab) => setTab(tab as TabValue)}
            defaultValue="collections"
          >
            <Flex 
              justify="between" 
              align="center" 
              css={{ 
                mb: '$4',
                flexDirection: 'column',
                gap: '$3',
                '@bp800': {
                  flexDirection: 'row',
                },
              }}
            >
              <Text style="h4" as="h4">
                Trending
              </Text>
              <Flex align="center" css={{ gap: '$4' }}>
                {tab === 'collections' ? (
                  <CollectionsTimeSelector
                    compact={true}
                    option={sortByTime}
                    onOptionSelected={(option) => {
                      setSortByTime(option)
                    }}
                  />
                ) : (
                  <MintsPeriodDropdown
                    option={sortByPeriod}
                    onOptionSelected={setSortByPeriod}
                  />
                )}
              </Flex>
            </Flex>

            <TabsContent value="collections">
              <Box css={{ height: '100%' }}>
                <Flex 
                  css={{ 
                    gap: '$3',
                    flexDirection: 'column',
                    '@bp800': {
                      flexDirection: 'row',
                      gap: '$5',
                    },
                  }}
                >
                  <Box css={{ flex: 1 }}>
                    {isSSR || !isMounted ? null : (
                      <CollectionRankingsTable
                        collections={(trendingCollections || []).slice(0, 5)}
                        volumeKey={volumeKey}
                        loading={isTrendingCollectionsValidating}
                      />
                    )}
                  </Box>
                  <Box 
                    css={{ 
                      flex: 1,
                      display: 'none',
                      '@bp800': {
                        display: 'block',
                      },
                    }}
                  >
                    {isSSR || !isMounted ? null : (
                      <CollectionRankingsTable
                        collections={(trendingCollections || []).slice(5, 10)}
                        volumeKey={volumeKey}
                        loading={isTrendingMintsValidating}
                        startingRank={6}
                      />
                    )}
                  </Box>
                </Flex>
              </Box>
            </TabsContent>
            <TabsContent value="mints">
              <Box
                css={{
                  height: '100%',
                }}
              >
                <Flex direction="column">
                  {isSSR || !isMounted ? null : (
                    <MintRankingsTable
                      mints={trendingMints || []}
                      loading={isTrendingMintsValidating}
                    />
                  )}
                  <Box
                    css={{
                      display: isTrendingCollectionsValidating
                        ? 'none'
                        : 'block',
                    }}
                  ></Box>
                </Flex>
              </Box>
            </TabsContent>
          </Tabs.Root>
        </Box>

        <Box 
          css={{ 
            my: '$4',
            textAlign: 'center',
            '@bp800': {
              my: '$5',
            },
          }}
        >
          <Link href={`/${chain.routePrefix}/${tab}/trending`}>
            <Button
              css={{
                background: '$primary9',
                color: 'white',
                width: 'calc(100% - 32px)',
                '@bp800': {
                  width: 'auto',
                },
                '&:hover': {
                  background: '$primary10',
                },
              }}
            >
              View All
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </Layout>
  )
}

type TrendingCollectionsSchema =
  paths['/collections/trending/v1']['get']['responses']['200']['schema']
type TrendingMintsSchema =
  paths['/collections/trending-mints/v1']['get']['responses']['200']['schema']

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    trendingMints: TrendingMintsSchema
    trendingCollections: TrendingCollectionsSchema
    featuredCollections: TrendingCollectionsSchema
  }
}> = async ({ params, res }) => {
  // Set smaller initial limit
  const INITIAL_LIMIT = 10

  const chainPrefix = params?.chain || ''
  const chain = supportedChains.find((chain) => chain.routePrefix === chainPrefix) || DefaultChain
  
  const headers: RequestInit = {
    headers: {
      'x-api-key': process.env.RESERVOIR_API_KEY || '',
    },
  }

  // Consolidated query parameters
  const baseQuery = {
    period: '24h' as const,
    limit: INITIAL_LIMIT,
  }

  const queries = {
    trending: { ...baseQuery, sortBy: 'volume' as const },
    featured: { ...baseQuery, sortBy: 'sales' as const },
    mints: { ...baseQuery, type: 'any' as const },
  }

  try {
    const [trending, featured, mints] = await Promise.all([
      fetcher(
        `${chain.reservoirBaseUrl}/collections/trending/v1`,
        queries.trending,
        headers
      ),
      fetcher(
        `${chain.reservoirBaseUrl}/collections/trending/v1`,
        queries.featured,
        headers
      ),
      fetcher(
        `${chain.reservoirBaseUrl}/collections/trending-mints/v1`,
        queries.mints,
        headers
      ),
    ])

    // Helper to safely extract data
    const extractData = (response: any) => response?.data || {}

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=120, stale-while-revalidate=180'
    )

    return {
      props: {
        ssr: {
          trendingCollections: extractData(trending),
          featuredCollections: extractData(featured),
          trendingMints: extractData(mints),
        },
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // Return empty data on error
    return {
      props: {
        ssr: {
          trendingCollections: {},
          featuredCollections: {},
          trendingMints: {},
        },
      },
    }
  }
}

export default Home

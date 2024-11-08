import { useTrendingCollections } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import { Head } from 'components/Head'
import Layout from 'components/Layout'
import CollectionsTimeDropdown, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeDropdown'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { Box, Flex, Text } from 'components/primitives'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import { useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import supportedChains, { DefaultChain } from 'utils/chains'
import fetcher from 'utils/fetcher'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isMounted = useMounted()
  const compactToggleNames = useMediaQuery({ query: '(max-width: 800px)' })
  const [sortByTime, setSortByTime] = useState<CollectionsSortingOption>('24h')

  const chainQueries = supportedChains.map(chain => {
    const { data, isValidating } = useTrendingCollections(
      {
        limit: 10,
        period: sortByTime,
      },
      chain.id,
      {
        fallbackData: ssr[chain.id]?.collections,
      }
    )
    return {
      chain,
      data: data || [],
      isValidating
    }
  })

  let volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey'] = '1day'

  switch (sortByTime) {
    case '30d':
      volumeKey = '30day'
      break
    case '7d':
      volumeKey = '7day'
      break
    case '24h':
      volumeKey = '1day'
      break
  }

  return (
    <Layout>
      <Head />
      <Box css={{ p: 24, height: '100%', '@bp800': { p: '$5' }, '@xl': { px: '$6' } }}>
        <Flex direction="column">
          <Flex
            justify="between"
            align="start"
            css={{
              flexDirection: 'column',
              gap: 24,
              mb: '$4',
              '@bp800': {
                alignItems: 'center',
                flexDirection: 'row',
              },
            }}
          >
            <Text style="h4" as="h4">
              Trending Collections
            </Text>
            <CollectionsTimeDropdown
              compact={compactToggleNames && isMounted}
              option={sortByTime}
              onOptionSelected={(option) => {
                setSortByTime(option)
              }}
            />
          </Flex>

          {isMounted ? (
            <Flex direction="column" css={{ gap: '$6' }}>
              {chainQueries.map(({ chain, data, isValidating }) => (
                <Box key={chain.id}>
                  <Text style="h5" as="h5" css={{ mb: '$4' }}>
                    {chain.name}
                  </Text>
                  <CollectionRankingsTable
                    collections={data}
                    volumeKey={volumeKey}
                    loading={isValidating}
                  />
                </Box>
              ))}
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </Layout>
  )
}

type TrendingCollectionsResponse =
  paths['/collections/trending/v1']['get']['responses']['200']['schema']

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const query = {
    limit: 10,
    period: '24h',
  }

  const chainData = await Promise.all(
    supportedChains.map(async (chain) => {
      const response = await fetcher(
        `${chain.reservoirBaseUrl}/collections/trending/v1`,
        query,
        {
          headers: {
            'x-api-key': process.env.RESERVOIR_API_KEY || '',
          },
        }
      )
      return {
        chainId: chain.id,
        collections: response.data
      }
    })
  )

  const ssr = chainData.reduce((acc, { chainId, collections }) => {
    acc[chainId] = { collections }
    return acc
  }, {} as Record<number, { collections: TrendingCollectionsResponse }>)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=60'
  )

  return {
    props: { ssr },
  }
}

export default IndexPage

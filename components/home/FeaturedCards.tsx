import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTrendingCollections } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import Img from 'components/primitives/Img'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import { TopTraders } from './TopTraders'

type TrendingCollections = ReturnType<typeof useTrendingCollections>['data']

interface FeaturedCardsProps {
  collections: TrendingCollections
  loading?: boolean
  className?: string
}

export const FeaturedCards: React.FC<FeaturedCardsProps> = ({
  collections,
  loading,
  className,
}) => {
  const { routePrefix } = useMarketplaceChain()

  const isValidImageUrl = (url?: string) => {
    if (!url) return false
    return (
      (url.startsWith('http') || url.startsWith('https')) &&
      !url.includes('undefined') &&
      !url.includes('null')
    )
  }

  const validCollections =
    collections
      ?.filter((collection) => {
        const bannerImage = collection?.banner || collection?.sampleImages?.[0]
        const collectionImage = collection?.image

        return isValidImageUrl(bannerImage) && isValidImageUrl(collectionImage)
      })
      ?.slice(0, 10) || null

  console.log('Total valid collections:', validCollections?.length)

  if (!validCollections) return null

  return (
    <>
      {!loading && validCollections.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          css={{ py: '$6', gap: '$4', width: '100%' }}
        >
          <Text css={{ color: '$gray11' }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
          </Text>
          <Text css={{ color: '$gray11' }}>No collections found</Text>
        </Flex>
      ) : (
        <Flex
          css={{
            overflowX: 'auto',
            gap: '$4',
            pb: '$2',
            width: '100%',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}
        >
          {validCollections.map((collection) => (
            <Box
              key={collection.id}
              css={{
                flex: '0 0 auto',
              }}
            >
              <Link
                href={`/${routePrefix}/collection/${collection.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  direction="column"
                  css={{
                    width: '300px',
                    height: '300px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: '$neutralBgSubtle',
                    $$shadowColor: '$colors$panelShadow',
                    boxShadow: '0px 0px 12px 0px $$shadowColor',
                    p: '0',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Img
                    src={collection?.banner as string}
                    alt={collection.name as string}
                    width={400}
                    height={400}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    unoptimized
                    priority
                  />
                  
                  <Box
                    css={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                      height: '70%',
                      borderRadius: '0 0 12px 12px',
                    }}
                  />

                  <Flex
                    direction="column"
                    css={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      px: '16px',
                      pb: '16px',
                    }}
                  >
                    <Box
                      css={{
                        maxWidth: 720,
                        lineHeight: 1.5,
                        fontSize: 16,
                        flex: 1,
                        fontWeight: 400,
                        display: '-webkit-box',
                        color: '$whiteA12',
                        fontFamily: '$body',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        gap: 16,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '& a': {
                          fontWeight: 500,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Flex
                        align="center"
                        css={{
                          width: 'fit-content',
                          mb: 16,
                          gap: '$2',
                        }}
                      >
                        <Text style="h6" as="h6" ellipsify css={{ color: '$whiteA12' }}>
                          {collection?.name}
                        </Text>
                      </Flex>
                      <Flex>
                        <Box css={{ mr: '$5' }}>
                          <Text style="subtitle2" css={{ mb: 2, color: '$whiteA11' }}>
                            Floor
                          </Text>
                          <FormatCryptoCurrency
                            amount={
                              collection?.floorAsk?.price?.amount?.native ?? 0
                            }
                            textStyle={'h6'}
                            logoHeight={12}
                            address={
                              collection?.floorAsk?.price?.currency?.contract
                            }
                          />
                        </Box>

                        <Box css={{ mr: '$4' }}>
                          <Text style="subtitle2" css={{ color: '$whiteA11' }}>
                            6h Sales
                          </Text>
                          <Text style="h6" as="h4" css={{ mt: 2, color: '$whiteA12' }}>
                            {collection.count?.toLocaleString()}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Link>
              {collection.id && <TopTraders collectionId={collection.id} />}
            </Box>
          ))}
        </Flex>
      )}
    </>
  )
}

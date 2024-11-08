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
  const marketplaceChain = useMarketplaceChain()

  const isValidImageUrl = (url?: string) => {
    if (!url) return false
    return (url.startsWith('http') || url.startsWith('https')) && 
           !url.includes('undefined') && 
           !url.includes('null')
  }

  const validCollections = collections?.filter(collection => {
    const bannerImage = collection?.banner || collection?.sampleImages?.[0]
    const collectionImage = collection?.image

    return isValidImageUrl(bannerImage) && isValidImageUrl(collectionImage)
  })?.slice(0, 10) || null

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
              display: 'none'
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
                href={`/collection/${collection.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  direction="column"
                  css={{
                    width: '280px',
                    height: '290px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: '$neutralBgSubtle',
                    $$shadowColor: '$colors$panelShadow',
                    boxShadow: '0px 0px 12px 0px $$shadowColor',
                    p: '0',
                  }}
                >
                  <Flex
                    css={{
                      mb: '24px',
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Flex
                      css={{
                        height: '150px',
                        width: '100%',
                      }}
                    >
                      <Img
                        src={collection?.banner as string}
                        alt={collection.name as string}
                        height={150}
                        width={280}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '12px 12px 0 0',
                        }}
                      />
                    </Flex>
                    <Img
                      src={collection?.image as string}
                      alt={collection.name as string}
                      height={50}
                      width={50}
                      css={{
                        height: '50px',
                        width: '50px',
                        position: 'absolute',
                        inset: '95px 0px 5px 16px',
                        border: '2px solid white',
                        borderRadius: 8,
                      }}
                    />
                  </Flex>
                  <Flex
                    direction="column"
                    css={{
                      width: '100%',
                      height: '100%',
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
                        color: '$gray12',
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
                        <Text style="h6" as="h6" ellipsify>
                          {collection?.name}
                        </Text>
                      </Flex>
                      <Flex>
                        <Box css={{ mr: '$5' }}>
                          <Text
                            style="subtitle2"
                            color="subtle"
                            as="p"
                            css={{ mb: 2 }}
                          >
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
                          <Text style="subtitle2" color="subtle" as="p">
                            6h Sales
                          </Text>
                          <Text style="h6" as="h4" css={{ mt: 2 }}>
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

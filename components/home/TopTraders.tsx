import { FC, useEffect, useState } from 'react'
import { Flex, Box, Text } from '../primitives'
import { useMarketplaceChain } from '../../hooks'

type Trader = {
  address: string
  buyCount: number
  sellCount: number
  totalCount: number
  buyVolume: number
  sellVolume: number
  totalVolume: number
}

type TopTradersProps = {
  collectionId: string
}

const TopTraderRow: FC<{ trader: Trader, rank: number }> = ({ trader, rank }) => (
  <Flex 
    css={{ 
      gap: '$3',
      py: '$2',
      alignItems: 'center',
      borderBottom: '1px solid $gray8'
    }}
  >
    <Text css={{ width: '30px' }}>#{rank}</Text>
    <Text css={{ flex: 1 }}>{trader.address.slice(0, 6)}...{trader.address.slice(-4)}</Text>
    <Text css={{ width: '80px' }}>{trader.totalCount} trades</Text>
    <Text css={{ width: '100px' }}>{trader.totalVolume.toFixed(2)} ETH</Text>
  </Flex>
)

export const TopTraders: FC<TopTradersProps> = ({ collectionId }) => {
  const [traders, setTraders] = useState<Trader[]>([])
  const marketplaceChain = useMarketplaceChain()

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const response = await fetch(
          `https://api.reservoir.tools/collections/${collectionId}/top-traders/v1`,
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR_API_KEY || ''
            }
          }
        )
        const data = await response.json()
        setTraders(data.traders?.slice(0, 5) || [])
      } catch (err) {
        console.error('Failed to fetch top traders:', err)
      }
    }

    if (collectionId) {
      fetchTraders()
    }
  }, [collectionId])

  if (!traders.length) return null

  return (
    <Box css={{ p: '$4', background: '$gray3', borderRadius: '$2' }}>
      <Text style="h6" css={{ mb: '$3' }}>Top Traders</Text>
      {traders.map((trader, i) => (
        <TopTraderRow key={trader.address} trader={trader} rank={i + 1} />
      ))}
    </Box>
  )
} 
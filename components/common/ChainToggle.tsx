import { FC, useCallback } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {
  ToggleGroup,
  ToggleGroupItem,
  Box,
  Text,
  Button,
  Flex,
} from '../primitives'
import supportedChains from 'utils/chains'
import { useContext } from 'react'
import { ChainContext } from 'context/ChainContextProvider'
import { TooltipArrow } from 'components/primitives/Tooltip'
import { useMounted } from 'hooks'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from 'components/primitives/Dropdown'

const ChainToggle = ({ onChainChange }: { onChainChange?: () => void }) => {
  const router = useRouter()
  const { chain, switchCurrentChain } = useContext(ChainContext)
  const isMounted = useMounted()
  const { theme } = useTheme()

  const handleChange = (newChainId: number) => {
    if (onChainChange) {
      onChainChange()
    }
    if (router.query.chain) {
      Object.keys(router.query).forEach((param) => delete router.query[param])
      router.replace(
        {
          pathname: router.pathname,
          query: router.query,
        },
        undefined,
        { shallow: true }
      )
    }
    switchCurrentChain(newChainId)
  }

  if (!isMounted || supportedChains.length === 1) {
    return null
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            px: '14px',
            justifyContent: 'center',
            width: 'auto',
            minWidth: 'max-content',
            backgroundColor: '$neutralBg',
            '@md': {
              minWidth: 'max-content',
              px: '$4',
            },
          }}
        >
          <Box
            as="img"
            src={theme === 'dark' ? chain.darkIconUrl : chain.lightIconUrl}
            css={{ height: 20 }}
            alt={`${chain.name} icon`}
          />
          <Box
            css={{
              color: '$gray10',
              transition: 'transform',
              '[data-state=open] &': { transform: 'rotate(180deg)' },
              ml: '$2',
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} width={16} />
          </Box>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenuContent
        css={{
          mt: '$2',
          zIndex: 1000,
          width: 'auto',
          maxHeight: 300,
          overflow: 'auto',
          minWidth: 'max-content',
          backgroundColor: '$neutralBg',
          '@md': {
            minWidth: 'max-content',
          },
        }}
      >
        {supportedChains.map((supportedChain) => (
          <DropdownMenuItem
            key={supportedChain.id}
            css={{ 
              py: '$3', 
              px: '$1', 
              display: 'flex', 
              gap: '$2',
              backgroundColor: '$neutralBg',
              '&:hover': {
                backgroundColor: '$gray3',
              }
            }}
            onClick={() => {
              router.query.chain = supportedChain.routePrefix
              router.push(router)
              handleChange(supportedChain.id)
            }}
          >
            <Flex css={{ width: 30 }} justify="center" align="center">
              <Box
                as="img"
                src={theme === 'dark'
                  ? supportedChain.darkIconUrl
                  : supportedChain.lightIconUrl}
                css={{ height: 20 }}
                alt={`${supportedChain.name} icon`}
              />
            </Flex>
            <Text style="body1">{supportedChain.name}</Text>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}

export default ChainToggle
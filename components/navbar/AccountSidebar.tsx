import { FC, useEffect, useState } from 'react'
import { Modal } from 'components/common/Modal'
import { useAccount, useDisconnect } from 'wagmi'
import { useENSResolver } from 'hooks'
import { Box, Button, Flex, Grid, Text } from 'components/primitives'
import { Avatar } from 'components/primitives/Avatar'
import ThemeSwitcher from './ThemeSwitcher'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faClose,
  faCopy,
  faHand,
  faList,
  faRightFromBracket,
  faStore,
} from '@fortawesome/free-solid-svg-icons'
import CopyText from 'components/common/CopyText'
import Link from 'next/link'
import Wallet from './Wallet'
import { useRouter } from 'next/router'
import { AvatarFallback } from '@radix-ui/react-avatar'

export const AccountSidebar: FC = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  const trigger = (
    <Button
      css={{
        justifyContent: 'center',
      }}
      corners="circle"
      type="button"
      color="gray3"
    >
      {ensAvatar ? (
        <Avatar
          size="medium"
          src={ensAvatar}
          fallback={
            <Jazzicon
              diameter={44}
              seed={jsNumberForAddress(address as string)}
            />
          }
        />
      ) : (
        <Jazzicon diameter={44} seed={jsNumberForAddress(address as string)} />
      )}
    </Button>
  )

  return (
    <Modal 
      trigger={trigger} 
      open={open} 
      onOpenChange={setOpen}
      title="Account"
    >
      <Flex 
        direction="column" 
        css={{ 
          py: '$2', 
          px: '$4',
          height: 'auto',
          maxHeight: 'auto'
        }}
      >
        <Flex align="center" css={{ gap: '$3', ml: '$3' }}>
          {ensAvatar ? (
            <Avatar size="large" src={ensAvatar} />
          ) : (
            <Jazzicon
              diameter={52}
              seed={jsNumberForAddress(address as string)}
            />
          )}
          <CopyText
            text={address || ''}
            css={{ width: 'max-content' }}
          >
            <Flex direction="column">
              <Flex
                align="center"
                css={{
                  gap: 8,
                  color: '$gray11',
                  cursor: 'pointer',
                }}
              >
                <Text style="body1">
                  {shortEnsName ? shortEnsName : shortAddress}
                </Text>
                {!shortEnsName ? (
                  <FontAwesomeIcon
                    icon={faCopy}
                    width={12}
                    height={14}
                  />
                ) : null}
              </Flex>
              {shortEnsName ? (
                <Flex
                  align="center"
                  css={{
                    gap: 8,
                    color: '$gray11',
                    cursor: 'pointer',
                  }}
                >
                  <Text style="body2" color="subtle">
                    {shortAddress}
                  </Text>
                  <FontAwesomeIcon
                    icon={faCopy}
                    width={12}
                    height={12}
                  />
                </Flex>
              ) : null}
            </Flex>
          </CopyText>
        </Flex>
        <Grid css={{ gridTemplateColumns: '1fr 1fr', mt: 24 }}>
          <Link
            href={`/portfolio/${address || ''}?tab=items`}
            replace={true}
          >
            <Flex
              align="center"
              css={{
                gap: 6,
                p: '$3',
                color: '$gray10',
                cursor: 'pointer',
              }}
            >
              {/* <FontAwesomeIcon icon={faStore} /> */}
              <Text style="body1">My Profile</Text>
            </Flex>
          </Link>
        </Grid>
        <Wallet />

        <Button
          size="large"
          css={{ my: '$2', justifyContent: 'center' }}
          color="gray3"
          onClick={() => disconnect()}
        >
          Disconnect Wallet
        </Button>
      </Flex>
    </Modal>
  )
}

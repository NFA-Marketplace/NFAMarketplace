import { FC } from 'react'
import { Text, Box, Flex, Anchor, Button } from '../primitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

type SectionTitleProps = {
  title: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <Text style="subtitle1" css={{ color: '$gray12', mb: 8 }}>
    {title}
  </Text>
)

type SectionLinkProps = {
  name: string
  href: string
}

const SectionLink: FC<SectionLinkProps> = ({ name, href }) => (
  <Anchor
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    weight="medium"
    css={{ fontSize: 14, mt: 16 }}
  >
    {name}
  </Anchor>
)

const communitySectionLinks = [
  {
    name: 'Shop NFA',
    href: 'https://nonfungibleart.io/nfashops/',
  },
  {
    name: 'Partners',
    href: 'https://nonfungibleart.io/partners/',
  },
  {
    name: 'Collections',
    href: 'https://nonfungibleart.io/collections/',
  },
  {
    name: 'Crypto Homies',
    href: 'https://cryptohomiesclub.io/',
  },
]

const companySectionLinks = [
  {
    name: 'Non-Fungible Art',
    href: 'https://nonfungibleart.io/',
  },
  {
    name: 'Meet the Team',
    href: 'https://nonfungibleart.io/team/',
  },
  {
    name: 'Terms of Use',
    href: 'https://nonfungibleart.io/terms-of-service/',
  },
  {
    name: 'Privacy Policy',
    href: 'https://nonfungibleart.io/privacy-policy/',
  },
]

export const Footer = () => {
  return (
    <Flex
      justify="between"
      css={{
        borderTop: '1px solid $gray7',
        borderStyle: 'solid',
        p: '$5',
        '@lg': {
          p: '$6',
        },
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 36,
        '@bp600': {
          flexDirection: 'row',
          gap: 0,
        },
      }}
    >
      <Flex css={{ gap: 80, '@bp600': { gap: 136 } }}>
        <Flex direction="column">
          <SectionTitle title="Community" />
          {communitySectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex>
        <Flex direction="column">
          <SectionTitle title="Company" />
          {companySectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        css={{ alignItems: 'flex-start', '@bp600': { alignItems: 'flex-end' } }}
      >
        <SectionTitle title="Join NFA Community" />
        <Flex css={{ gap: '$4', mt: 16 }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/NFA_Inc"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
            </Button>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.gg/MbPu2nDPkA"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faDiscord} width={14} height={14} />
            </Button>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fnonfungibleartinc%2F&is_from_rle"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faInstagram} width={14} height={14} />
            </Button>
          </a>
        </Flex>
      </Flex>
    </Flex>
  )
}

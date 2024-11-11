import React from 'react'
import { Text, Box } from '../primitives'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { FC } from 'react'
import { styled } from '../../stitches.config'
import { useTrendingCollections } from '../../hooks/useTrendingCollections'

export type CollectionsSortingOption = '1h' | '6h' | '24h' | '7d'

const sortingOptions: CollectionsSortingOption[] = [
  '1h',
  '6h',
  '24h',
  '7d',
]

const StyledRadioGroup = styled(RadioGroup.Root, {
  display: 'flex',
  background: '$neutralBg',
  padding: '4px',
  borderRadius: '8px',
  gap: '4px',
  position: 'relative',
})

const StyledRadioButton = styled(RadioGroup.Item, {
  width: 'auto',
  minWidth: '48px',
  height: '32px',
  padding: '0 $3',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  border: 'none',
  color: '$gray12',
  position: 'relative',
  zIndex: 1,
  transition: 'color 250ms ease',
  '&:hover': {
    backgroundColor: '$gray4',
  },
})

const SlidingBackground = styled('div', {
  position: 'absolute',
  borderRadius: '8px',
  backgroundColor: '$neutralBgActive',
  transition: 'transform 250ms ease',
  width: '48px',
  height: '32px',
  zIndex: 0,
})

type Props = {
  compact?: boolean
  option: CollectionsSortingOption
  onOptionSelected: (option: CollectionsSortingOption) => void
}

const CollectionsTimeSelector: FC<Props> = ({
  compact = false,
  option,
  onOptionSelected,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(sortingOptions.indexOf(option))

  return (
    <StyledRadioGroup 
      value={option} 
      onValueChange={(value: CollectionsSortingOption) => {
        onOptionSelected(value)
        setActiveIndex(sortingOptions.indexOf(value))
      }}
    >
      <SlidingBackground 
        style={{
          transform: `translateX(${activeIndex * (48 + 4)}px)`,
        }}
      />
      {sortingOptions.map((optionItem) => (
        <StyledRadioButton key={optionItem} value={optionItem}>
          <Text style="body2">
            {nameForSortingOption(optionItem, compact)}
          </Text>
        </StyledRadioButton>
      ))}
    </StyledRadioGroup>
  )
}

const nameForSortingOption = (
  option: CollectionsSortingOption,
  compact: boolean
) => {
  switch (option) {
    case '1h':
      return compact ? '1h' : '1h'
    case '6h':
      return compact ? '6h' : '6h'
    case '24h':
      return compact ? '24h' : '24h'
    case '7d':
      return compact ? '7d' : '7d'
  }
}

export default CollectionsTimeSelector 
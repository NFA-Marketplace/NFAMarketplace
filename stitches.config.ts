import {
  crimson,
  slate,
  crimsonDark,
  violetDark,
  slateDark,
  greenDark,
  iris,
  irisDark,
  gray,
  green,
  violetDarkA,
  whiteA,
  redDark,
  red,
  blackA,
  violet,
  violetA,
  indigo,
} from '@radix-ui/colors'
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { reset } from 'utils/css/reset'
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
})

// CONFIGURABLE: Here you can update all your theming (outside of ReservoirKit which can be configured in the app.tsx)
// The theme colors are all already hooked up to stitches scales, so you just need to swap them.
// Don't forget to check the dark mode themes below.
// More on Stitches theme tokens: https://stitches.dev/docs/tokens
// More on Radix color scales: https://www.radix-ui.com/docs/colors/palette-composition/the-scales

export const { createTheme, keyframes, styled, globalCss, getCssText } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...red,
        ...violet,
        ...violetA,
        ...slate,
        ...whiteA,
        ...blackA,
        ...iris,
        ...green,
        ...indigo,

        //Aliases
        primary1: '#fff1f1',
        primary2: '#ffe1e1',
        primary3: '#ffd1d1',
        primary4: '#ffb4b4',
        primary5: '#ff8a8a',
        primary6: '#ff5c5c',
        primary7: '#ff2d2d',
        primary8: '#ff0000',
        primary9: '#e60000',
        primary10: '#cc0000',
        primary11: '#b30000',
        primary12: '#990000',

        //Secondary
        secondary1: '$redA1',
        secondary2: '$redA2',
        secondary3: '$redA3',
        secondary4: '$redA4',
        secondary5: '$redA5',
        secondary6: '$redA6',
        secondary7: '$redA7',
        secondary8: '$redA8',
        secondary9: '$redA9',
        secondary10: '$redA10',
        secondary11: '$redA11',
        secondary12: '$redA12',

        //Gray
        gray1: '$slate1',
        gray2: '$slate2',
        gray3: '$slate3',
        gray4: '$slate4',
        gray5: '$slate5',
        gray6: '$slate6',
        gray7: '$slate7',
        gray8: '$slate8',
        gray9: '$slate9',
        gray10: '$slate10',
        gray11: '$slate11',
        gray12: '$slate12',

        //Red
        red1: '$crimson1',
        red2: '$crimson2',
        red3: '$crimson3',
        red4: '$crimson4',
        red5: '$crimson5',
        red6: '$crimson6',
        red7: '$crimson7',
        red8: '$crimson8',
        red9: '$crimson9',
        red10: '$crimson10',
        red11: '$crimson11',
        red12: '$crimson12',

        neutralBg: 'white',
        neutralBgSubtle: 'white',
        panelShadow: 'rgba(0,0,0,0.1)',
        panelBg: '$gray2',
        panelBorder: 'transparent',
        dropdownBg: 'white',
        sidebarOverlay: 'black',
      },
      space: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '32px',
        6: '64px',
      },
      fontSizes: {},
      fontWeights: {},
      fonts: {
        body: inter.style.fontFamily,
        button: '$body',
      },
      lineHeights: {},
      letterSpacings: {},
      sizes: {},
      radii: {},
      shadows: {},
      transitions: {},
      breakpoints: {
        sm: 100,
      },
    },
    utils: {
      // MARGIN
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      mt: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mb: (value: Stitches.PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mr: (value: Stitches.PropertyValue<'margin'>) => ({
        marginRight: value,
      }),

      // PADDING
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      pt: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pb: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      pr: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      // DIMENSIONS
      w: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
      }),
      h: (value: Stitches.PropertyValue<'height'>) => ({
        height: value,
      }),
      size: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
      // GRID
      colSpan: (value: number | 'full') => {
        if (value === 'full') {
          return {
            gridColumn: '1 / -1',
          }
        }
        return {
          gridColumn: `span ${value} / span ${value}`,
        }
      },
    },
    media: {
      sm: '(min-width: 600px)',
      md: '(min-width: 900px)',
      lg: '(min-width: 1200px)',
      xl: '(min-width: 1820px)',
      bp300: '(min-width: 300px)',
      bp400: '(min-width: 400px)',
      bp500: '(min-width: 500px)',
      bp600: '(min-width: 600px)',
      bp700: '(min-width: 700px)',
      bp800: '(min-width: 800px)',
      bp900: '(min-width: 900px)',
      bp1000: '(min-width: 1000px)',
      bp1100: '(min-width: 1100px)',
      bp1200: '(min-width: 1200px)',
      bp1300: '(min-width: 1300px)',
      bp1400: '(min-width: 1400px)',
      bp1500: '(min-width: 1500px)',
      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },
  })

export const globalReset = globalCss(reset)

export const darkTheme = createTheme({
  colors: {
    ...crimsonDark,
    ...violetDark,
    ...violetDarkA,
    ...slateDark,
    ...greenDark,
    ...irisDark,
    ...whiteA,
    ...redDark,
    ...blackA,

    //Aliases

    //Primary
    primary1: '$red1',
    primary2: '$red2',
    primary3: '$red3',
    primary4: '$red4',
    primary5: '$red5',
    primary6: '$red6',
    primary7: '$red7',
    primary8: '$red8',
    primary9: '$red9',
    primary10: '$red10',
    primary11: '$red11',
    primary12: '$red12',

    //Secondary
    secondary1: '$redA1',
    secondary2: '$redA2',
    secondary3: '$redA3',
    secondary4: '$redA4',
    secondary5: '$redA5',
    secondary6: '$redA6',
    secondary7: '$redA7',
    secondary8: '$redA8',
    secondary9: '$redA9',
    secondary10: '$redA10',
    secondary11: '$redA11',
    secondary12: '$redA12',

    //Gray
    gray1: '$slate1',
    gray2: '$slate2',
    gray3: '$slate3',
    gray4: '$slate4',
    gray5: '$slate5',
    gray6: '$slate6',
    gray7: '$slate7',
    gray8: '$slate8',
    gray9: '$slate9',
    gray10: '$slate10',
    gray11: '$slate11',
    gray12: '$slate12',

    accent: '#FF0000',

    neutralBgSubtle: '$gray1',
    neutralBg: 'black',

    panelBg: '$gray3',
    panelBorder: '$slate7',
    panelShadow: 'transparent',
    dropdownBg: '$gray3',
    sidebarOverlay: 'black',
  },
})

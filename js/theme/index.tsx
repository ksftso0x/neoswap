//import { transparentize } from 'polished'
//import React, { useMemo } from 'react
import React from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useDarkModeManager } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'


const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkTheme: boolean): Colors {
  if (darkTheme) {
    return {
      // base
      white,
      black,

      // text
      text1: '#fff',
      text2: '#fff',
      text3: '#fff',
      text4: '#fff',
      text5: '#fff',
      textSpecial: '#E1E2EF',
      // backgrounds / greys
      mainBg: "#31313A",
      bg1: '#34343a',
      bg2: '#34343a',
      bg3: '#34343a',
      bg4: '#34343a',
      bg5: '#34343a',

      //specialty colors
      modalBG: 'rgba(0,0,0,.425)',
      advancedBG: 'rgba(0,0,0,0.1)',

      //primary colors
      primary1: '#B497D6',
      primary2: '#B497D6',
      primary3: '#B497D6',
      primary4: '#B497D6',
      primary5: '#B497D6',

      // color text
      primaryText1: '#E1E2EF',

      // secondary colors
      secondary1: '#E1E2EF',
      secondary2: '#E1E2EF',
      secondary3: '#E1E2EF',

      // other
      red1: '#FF6871',
      red2: '#F82D3A',
      green1: '#27AE60',
      yellow1: '#FFE270',
      yellow2: '#F3841E',

      // new colors

      highlight1: '#9d9ea7',
      highlight2: '#87878f',
      background1: '#02020A',
      background2: '#02020A70',
      background3: '#1b1b22',
      background4: '#34343a',
      font1: '#E1E2EF',
      font2: '#E1E2EF',
      fontHighlight1: '#222',
      fontHighlight2: '#222',
    }
  } else {
    return {
      // base
      white,
      black,

      // text
      text1: '#FFF',
      text2: '#FFF',
      text3: '#FFF',
      text4: '#FFF',
      text5: '#FFF',
      textSpecial: '#FFF',

      // backgrounds / greys
      mainBg: "#E7E6F7",
      bg1: '#E7E6F7',
      bg2: '#E7E6F7',
      bg3: '#E7E6F7',
      bg4: '#E7E6F7',
      bg5: '#E7E6F7',

      //specialty colors
      modalBG: 'rgba(0,0,0,.425)',
      advancedBG: 'rgba(0,0,0,0.1)',

      //primary colors
      primary1: '#E7E6F7',
      primary2: '#E7E6F7',
      primary3: '#E7E6F7',
      primary4: '#E7E6F7',
      primary5: '#E7E6F7',

      // color text
      primaryText1: '#E7E6F7',

      // secondary colors
      secondary1: '#E7E6F7',
      secondary2: '#E7E6F7',
      secondary3: '#E7E6F7',

      // other
      red1: '#FF6871',
      red2: '#F82D3A',
      green1: '#27AE60',
      yellow1: '#FFE270',
      yellow2: '#F3841E',

      // new colors


      highlight1: '#C6D2ED',
      highlight2: '#E7E6F7',
      background1: '#2e4f93',
      background2: '#2e4f9370',
      background3: '#4E84F5',
      background4: '#6998F7',
      font1: '#FFF',
      font2: '#FFF',
      fontHighlight1: '#222',
      fontHighlight2: '#222',
    }
  }
}

export function theme(isDark: boolean): DefaultTheme {
  return {
    ...colors(isDark),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: '#000',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,

    button: css`
    background-color: var(--background2);
color: var(--font2);
text-shadow: var(--font3) 0 0 2.5px;
svg {
  color: var(--font2) !important;
  filter: drop-shadow(0 0 5px var(--font3));
}
text-decoration: none;
font-size: 1.25em;
font-weight: bolder;
cursor: pointer;
border: 0.15rem solid var(--highlight2) ;
border-radius: 0.5rem;
box-shadow: 0 0 10px var(--highlight2);
height: 35px;
transition: 0.2s;
display: flex;
justify-content: center;
align-items: center;
padding: 0.1em 0.25em;



& > *:only-child {
  background-color: transparent;
}

:hover {
background-color: var(--highlight2);
box-shadow: 0 0 10px var(--highlight2);
color: var(--font3);
text-shadow: var(--font2) 0 0 5px;
scale: 1.1;
svg {
  color: var(--font3) !important;
  filter: drop-shadow(0 0 2.5px var(--font2));
}
}

:active {
background-color: var(--highlight1);
box-shadow: 0 0 5px var(--highlight1);
border-color: var(--highlight1);
scale: 0.95;
}

:disabled
{
  filter: grayscale(100%) !important;
  cursor: auto !important;
  scale: 1 !important;
  background-color: var(--background2) !important;
  color: var(--highlight2) !important;
  text-shadow: var(--highlight2) 0 0 0px !important;
  box-shadow: 0 0 0px var(--highlight2) !important;
  border-color: var(--highlight2) !important;
}
:hover:disabled {
  filter: grayscale(100%);
  cursor: auto;
  scale: 1;
  background-color: var(--background2);
  color: var(--font3);
  text-shadow: var(--font3) 0 0 0px;
  box-shadow: 0 0 0px var(--highlight2);
  border-color: var(--highlight2);
}
    `,

    background: css`
    background-color: var(--background2);
backdrop-filter: blur(5px);
border-radius: 1em;
padding: 1em;
border: 0.2em solid var(--highlight1);
border-radius: 1em;
padding: 1em;
box-shadow: 0 0 5px var(--highlight1);
    `,
    link: css`
    background-color: transparent;
    border: none;
    color: var(--highlight2);
    text-shadow: var(--highlight2) 0 0 2.5px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;
  
  
  :hover {
    color: var(--highlight2);background3
    text-shadow: var(--highlight1) 0 0 5px;
    scale: 0.95;
  }
  
  :disabled {
    filter: grayscale(100%);
    cursor: auto;
  }
    `
  }

}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark] = useDarkModeManager()

  const themeObject = theme(isDark)

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text) <{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`


export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.018em;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}


html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  transition: 0.1s;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`
//background-color: ${({ theme }) => theme.bg2};
export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.font1};
  text-shadow: 0 0 7px ${({ theme }) => theme.fontHighlight2};
  background-color: ${({ theme }) => theme.background3};
}

:root
{
    --highlight1: ${({ theme }) => theme.highlight1};
    --highlight2: ${({ theme }) => theme.highlight2};
    --background1: ${({ theme }) => theme.background1};
    --background2: ${({ theme }) => theme.background2};
    --background3: ${({ theme }) => theme.background3};
    --background4: ${({ theme }) => theme.background4};
    --font1: ${({ theme }) => theme.font1};
    --font2: ${({ theme }) => theme.font2};
    --font3: ${({ theme }) => theme.fontHighlight1};
    --font4: ${({ theme }) => theme.fontHighlight2};
}
`
/* 
body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${theme.primary5} 0%, ${transparentize(1, theme.primary4)} 100%)`};
}
*/

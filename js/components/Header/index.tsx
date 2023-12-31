import { ChainId } from 'neoswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/images/mainlogo.png'
import { useActiveWeb3React } from '../../hooks'
//import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { Moon, Sun } from 'react-feather'

import { useDarkModeManager } from '../../state/user/hooks'
import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import Toggle, { ToggleLightNight } from '../Toggle'
import LivePrice from '../TokenLivePrice/livePrice'


// import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
  background-color: var(--background2);
  border-bottom: 1px solid var(--highlight1);
  padding: 1rem;
  backdrop-filter: blur(5px);
`

const HeaderFrameMobile = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
  background-color: var(--background2);
  border-bottom: 1px solid var(--highlight1);
  padding: 1rem;
  backdrop-filter: blur(5px);
  padding-bottom: 1rem !important;
`


const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  text-decoration-style: unset;

  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`

`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.STANDALONE]: 'Neoswap Development',
  [ChainId.MOONROCK]: 'Neoswap Rococo',
  [ChainId.MOONBASE]: 'Neoswap Alpha',
  [ChainId.MOONSHADOW]: 'Neoshadow Westend',
  [ChainId.FLARE]: 'Flare Mainnet',
  [ChainId.COSTON]: 'Coston Testnet',
  [ChainId.SONGBIRD]: 'Songbird'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const [darkMode, toggleDarkMode] = useDarkModeManager()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  //const [isDark] = useDarkModeManager()

  if (isMobile) {
    return (
      <HeaderFrameMobile>
        <HeaderElement>
          {/* yellow thing */}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {/* {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} SGB
                </BalanceText>
              ) : null} */}
            <Web3Status />
          </AccountElement>
        </HeaderElement>

        <ToggleLightNight isActive={darkMode} toggle={toggleDarkMode} />
        <Settings />
      </HeaderFrameMobile>
    )
  } else {
    return (
      <HeaderFrame>
        <RowBetween style={{ alignItems: 'flex-start' }}>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
          </HeaderElement>

          <HeaderControls>
            <HeaderElement>
              {/* yellow thing */}
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {/* {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} SGB
                </BalanceText>
              ) : null} */}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            <HeaderElement>
              <ToggleLightNight isActive={darkMode} toggle={toggleDarkMode} />
            </HeaderElement>
            <HeaderElementWrap>
              {/* <VersionSwitch /> */}
              <Settings />
            </HeaderElementWrap>
          </HeaderControls>
        </RowBetween>
      </HeaderFrame>
    )
  }
}

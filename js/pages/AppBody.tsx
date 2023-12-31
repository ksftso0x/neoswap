import React from 'react'
import styled from 'styled-components'
import LivePrice from '../components/TokenLivePrice/livePrice'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  ${({ theme }) => theme.background}
  padding: 0rem;
  margin-top: 0em;
`

const PaddingWrapper = styled.div`
padding: 1em;
`

const LivePriceWraper = styled.div`
margin-top: 1.2em;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  
`



/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LivePriceWraper>
        <LivePrice />
      </LivePriceWraper>
      <BodyWrapper>
        <PaddingWrapper>
          {children}
        </PaddingWrapper>
      </BodyWrapper>
    </>
  )
}

import React, { HTMLProps, useCallback } from 'react'
import ReactGA from 'react-ga'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { darken } from 'polished'
import { ArrowLeft, X } from 'react-feather'

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1
}))`
${({ theme }) => theme.button}
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
${({ theme }) => theme.link}
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
${({ theme }) => theme.link}

`

const StyledLink = styled.a`
${({ theme }) => theme.link}
`

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug('Fired outbound link event', href)
        })
      } else {
        event.preventDefault()
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href
        })
      }
    },
    [href, target]
  )
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

const BackArrowLink = styled(StyledInternalLink)`
  color: var(--highlight2);
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

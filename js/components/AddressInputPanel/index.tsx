import React, { useContext, useCallback } from 'react'
import styled, { ThemeContext } from 'styled-components'
import useENS from '../../hooks/useENS'
import { useActiveWeb3React } from '../../hooks'
import { ExternalLink, TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { getEtherscanLink } from '../../utils'

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.background}
`

const InputContainer = styled.div`
  flex: 1;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  padding: 0.1em;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: var(--text2);
  }
  color: ${({ theme }) => theme.font1};
  text-shadow: 0 0 3px ${({ theme }) => theme.fontHighlight2};
`

export default function AddressInputPanel({
  id,
  value,
  onChange
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
}) {
  const { chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const { address, loading, name } = useENS(value)

  const handleInput = useCallback(
    event => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange]
  )

  const error = Boolean(value.length > 0 && !loading && !address)

  return (
    <InputPanel id={id}>
      <ContainerRow error={error}>
        <InputContainer>
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
                Recipient
              </TYPE.black>
              {address && chainId && (
                <ExternalLink href={getEtherscanLink(chainId, name ?? address, 'address')} style={{ fontSize: '14px' }}>
                  (View on NeoSwap explorer)
                </ExternalLink>
              )}
            </RowBetween>
            <Input
              className="recipient-address-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Wallet Address or ENS name"
              error={error}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}

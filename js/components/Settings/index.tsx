import React, { useRef, useContext, useState } from 'react'
import { Settings, X } from 'react-feather'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import {
  useUserSlippageTolerance,
  useExpertModeManager,
  useUserDeadline,
} from '../../state/user/hooks'
import TransactionSettings from '../TransactionSettings'
import { useDarkModeManager } from '../../state/user/hooks'
import { RowFixed, RowBetween } from '../Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../QuestionHelper'
import Toggle from '../Toggle'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../Column'
import { ButtonError } from '../Button'
import { useSettingsMenuOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { Text } from 'rebass'
import Modal from '../Modal'
import { useTranslation } from 'react-i18next'

const StyledMenuIcon = styled(Settings)`
  height: 20px;
  width: 20px;
`

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }


`

const StyledMenuButton = styled.button`
  ${({ theme }) => theme.button}
  min-width: 38px;
`
const EmojiWrapper = styled.div`
  position: absolute;
  scale: 1;
  top: -5px;
  left: -5px;
  font-size: 14px;
  display: block;
  span {
    text-shadow: ${({ theme }) => theme.yellow1};
  }
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 20.125rem;
  ${({ theme }) => theme.background}
  display: flex;
  flex-direction: column;
  flex-align: center;
  justify-content: center;
  font-size: 1rem;
  position: absolute;
  top: 4em;
  z-index: 100;
  right: 0px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 18.125rem;
    right: 0px;
  `};
`

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--highlight1);
`

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  border-radius: 20px;
`

export default function SettingsTab() {
  const node = useRef<HTMLDivElement>()
  const open = useSettingsMenuOpen()
  const toggle = useToggleSettingsMenu()
  const { t } = useTranslation()

  const theme = useContext(ThemeContext)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()

  const [deadline, setDeadline] = useUserDeadline()

  const [expertMode, toggleExpertMode] = useExpertModeManager()

  const [darkMode, toggleDarkMode] = useDarkModeManager()

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false)

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <RowBetween style={{ padding: '0 2rem' }}>
              <div />
              <Text fontWeight={600} fontSize={40} style={{"textAlign":"center"}}>
              {t('areYouSure')}
              </Text>
              <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
            </RowBetween>
            <Break />
            <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
              <Text fontWeight={500} fontSize={15} style={{"textAlign":"center"}}>
              Expert mode will disable the confirmation prompt before executing a transaction, aswell as allow for high slippage trades, which can result in bad rates and lost funds.
              </Text>
              <Text fontWeight={800} fontSize={25} style={{"textAlign":"center"}}>
               Use at your own risk!
              </Text>
              <ButtonError
                error={true}
                padding={'12px'}
                onClick={() => {
                    toggleExpertMode()
                    setShowConfirmation(false)
                }}
              >
                <Text fontSize={20} fontWeight={500} id="confirm-expert-mode">
                {t('turnOnExpertMode')}
                </Text>
              </ButtonError>
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton onClick={toggle} id="open-settings-dialog-button">
        <StyledMenuIcon />
        {expertMode && (
          <EmojiWrapper>
            <span>⭐</span>
          </EmojiWrapper>
        )}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={800} fontSize={24}>
              {t('transactionSettings')}
            </Text>
            <TransactionSettings
              rawSlippage={userSlippageTolerance}
              setRawSlippage={setUserslippageTolerance}
              deadline={deadline}
              setDeadline={setDeadline}
            />
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                {t('toggleExpertMode')}
                </TYPE.black>
                <QuestionHelper text="Bypasses confirmation modals and allows high slippage trades. Use at your own risk." />
              </RowFixed>
              <Toggle
                id="toggle-expert-mode-button"
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                        toggleExpertMode()
                        setShowConfirmation(false)
                      }
                    : () => {
                        toggle()
                        setShowConfirmation(true)
                      }
                }
              />
            </RowBetween>
            
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}


{/* <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  {t('toggleDarkMode')}
                </TYPE.black>
              </RowFixed>
              <Toggle isActive={darkMode} toggle={toggleDarkMode} />
            </RowBetween> */}
  

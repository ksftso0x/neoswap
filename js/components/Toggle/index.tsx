import React from 'react'
import { Sun, Moon, Icon } from 'react-feather';
import styled from 'styled-components'

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  height: 100%;
  background: ${({ theme, isActive, isOnSwitch }) => ((isActive ? "var(--highlight1)" : "transparent"))};
  color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3)};
  font-size: 0.825rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 0.25rem 0.25rem;
  border-radius: 0.25rem;
  
`

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean }>`

${({ theme }) => theme.button}
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0;
  background-color: var(--background1);
`

export interface ToggleProps {
  id?: string
  isActive: boolean
  toggle: () => void
}

export default function Toggle({ id, isActive, toggle }: ToggleProps) {

  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={isActive} isOnSwitch={true}>
        On
      </ToggleElement>
      <ToggleElement isActive={!isActive} isOnSwitch={false}>
        Off
      </ToggleElement>
    </StyledToggle>
  )
}

export function ToggleLightNight({ id, isActive, toggle }: ToggleProps) {

  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={isActive} isOnSwitch={true}>
        <Moon></Moon>
      </ToggleElement>
      <ToggleElement isActive={!isActive} isOnSwitch={false}>
        <Sun></Sun>
      </ToggleElement>
    </StyledToggle>
  )
}

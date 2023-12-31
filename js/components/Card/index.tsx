import React from 'react'
import styled from 'styled-components'
import { CardProps, Text } from 'rebass'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{ padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
${({ theme }) => theme.background}
background-color: var(--highlight1);
font-weight: bolder;
padding: 0.25rem 0.5rem;
`

export const GreyCard = styled(Card)`
${({ theme }) => theme.background}
background-color: var(--highlight1);
font-weight: bolder;
padding: 0.25rem 0.5rem;
`

export const OutlineCard = styled(Card)`
${({ theme }) => theme.background}
font-weight: bolder;
padding: 0.25rem 0.5rem;
`

export const YellowCard = styled(Card)`
  ${({ theme }) => theme.background}
  background-color: var(--highlight1);
  color: var(--font3);
  text-shadow: var(--font3) 0 0 0px;
  font-weight: bolder;
  padding: 0.25rem 0.5rem;
`

export const PinkCard = styled(Card)`
${({ theme }) => theme.background}
background-color: var(--highlight1);
font-weight: bolder;
padding: 0.25rem 0.5rem;
`

const BlueCardStyled = styled(Card)`
${({ theme }) => theme.background}
background-color: var(--highlight1);
font-weight: bolder;
padding: 0.25rem 0.5rem;
`

export const BlueCard = ({ children, ...rest }: CardProps) => {
  return (
    <BlueCardStyled {...rest}>
      <Text fontWeight={500} color="#2172E5">
        {children}
      </Text>
    </BlueCardStyled>
  )
}

import React from "react";
import styled from "styled-components";
import { Twitter, MessageCircle } from 'react-feather'

const FooterElement = styled.footer`
  width: 100%;
  min-height: 5vh;
  background-color: var(--background2);
  display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid var(--highlight1);
  backdrop-filter: blur(5px);
`
const LinkHolder = styled.div`
display: flex;
gap 1rem;
flex-direction: row;
justify-content: center;
align-items: center;
align-content: center;
svg {
    filter: drop-shadow(0px 0px 5px var(--highlight2));
    stroke: var(--highlight2);
}
`

const CopyRigth = styled.p`
    color: var(--text1);
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
`

const SocialLink = styled.a`
   ${({ theme }) => theme.link};
`

export default function Footer() {
    return (
        <FooterElement>
            <LinkHolder>
                <SocialLink href="https://twitter.com/Canary_Punks" target="_blank"><Twitter></Twitter></SocialLink>
                <SocialLink href="https://discord.com/invite/8cdPB9M3e8" target="_blank"><MessageCircle></MessageCircle></SocialLink>
            </LinkHolder>
            <CopyRigth>Canary Punks © 2023</CopyRigth>
        </FooterElement>
    );
}
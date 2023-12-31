import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import Swap from './Swap'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Footer from '../components/Footer/footer'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 160px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const Background = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    @keyframes animate {
      0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
      }
      100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
      }
  }
  
  .background {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      background: var(--background3);
      overflow: hidden;
  }
  .background li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: var(--background4);
      animation: animate 33s linear infinite;
  }
  
  
  
  
  .background li:nth-child(0) {
      left: 66%;
      width: 8px;
      height: 8px;
      bottom: -8px;
      animation-delay: ${1-25}s;
  }
  .background li:nth-child(1) {
      left: 4%;
      width: 109px;
      height: 109px;
      bottom: -109px;
      animation-delay: ${2-25}s;
  }
  .background li:nth-child(2) {
      left: 5%;
      width: 75px;
      height: 75px;
      bottom: -75px;
      animation-delay: ${10-25}s;
  }
  .background li:nth-child(3) {
      left: 71%;
      width: 22px;
      height: 22px;
      bottom: -22px;
      animation-delay: ${3-25}s;
  }
  .background li:nth-child(4) {
      left: 16%;
      width: 32px;
      height: 32px;
      bottom: -32px;
      animation-delay: ${12-25}s;
  }
  .background li:nth-child(5) {
      left: 48%;
      width: 73px;
      height: 73px;
      bottom: -73px;
      animation-delay: ${9-25}s;
  }
  .background li:nth-child(6) {
      left: 34%;
      width: 2px;
      height: 2px;
      bottom: -2px;
      animation-delay: ${3-25}s;
  }
  .background li:nth-child(7) {
      left: 32%;
      width: 33px;
      height: 33px;
      bottom: -33px;
      animation-delay: ${24-25}s;
  }
  .background li:nth-child(8) {
      left: 63%;
      width: 17px;
      height: 17px;
      bottom: -17px;
      animation-delay: ${34-25}s;
  }
  .background li:nth-child(9) {
      left: 79%;
      width: 11px;
      height: 11px;
      bottom: -11px;
      animation-delay: ${14-25}s;
  }
  .background li:nth-child(10) {
      left: 5%;
      width: 107px;
      height: 107px;
      bottom: -107px;
      animation-delay: ${27-25}s;
  }
  .background li:nth-child(11) {
      left: 66%;
      width: 18px;
      height: 18px;
      bottom: -18px;
      animation-delay: ${4-25}s;
  }
  .background li:nth-child(12) {
      left: 55%;
      width: 114px;
      height: 114px;
      bottom: -114px;
      animation-delay: ${12-25}s;
  }
  .background li:nth-child(13) {
      left: 8%;
      width: 39px;
      height: 39px;
      bottom: -39px;
      animation-delay: ${52-25}s;
  }
  .background li:nth-child(14) {
      left: 80%;
      width: 74px;
      height: 74px;
      bottom: -74px;
      animation-delay: ${33-25}s;
  }
  .background li:nth-child(15) {
      left: 58%;
      width: 56px;
      height: 56px;
      bottom: -56px;
      animation-delay: ${39-25}s;
  }
  .background li:nth-child(16) {
      left: 50%;
      width: 42px;
      height: 42px;
      bottom: -42px;
      animation-delay: ${17-25}s;
  }
  .background li:nth-child(17) {
      left: 14%;
      width: 91px;
      height: 91px;
      bottom: -91px;
      animation-delay: ${40-25}s;
  }
  .background li:nth-child(18) {
      left: 16%;
      width: 40px;
      height: 40px;
      bottom: -40px;
      animation-delay: ${39-25}s;
  }
  .background li:nth-child(19) {
      left: 12%;
      width: 89px;
      height: 89px;
      bottom: -89px;
      animation-delay: ${69-25}s;
  }
  .background li:nth-child(20) {
      left: 26%;
      width: 62px;
      height: 62px;
      bottom: -62px;
      animation-delay: ${49-25}s;
  }
  .background li:nth-child(21) {
      left: 13%;
      width: 50px;
      height: 50px;
      bottom: -50px;
      animation-delay: ${50-25}s;
  }
  .background li:nth-child(22) {
      left: 46%;
      width: 18px;
      height: 18px;
      bottom: -18px;
      animation-delay: ${25-25}s;
  }
  .background li:nth-child(23) {
      left: 16%;
      width: 109px;
      height: 109px;
      bottom: -109px;
      animation-delay: ${25-25}s;
  }
  .background li:nth-child(24) {
      left: 75%;
      width: 93px;
      height: 93px;
      bottom: -93px;
      animation-delay: ${49-25}s;
  }
  .background li:nth-child(25) {
      left: 14%;
      width: 83px;
      height: 83px;
      bottom: -83px;
      animation-delay: ${46-25}s;
  }
  .background li:nth-child(26) {
      left: 21%;
      width: 112px;
      height: 112px;
      bottom: -112px;
      animation-delay: ${35-25}s;
  }
  .background li:nth-child(27) {
      left: 12%;
      width: 114px;
      height: 114px;
      bottom: -114px;
      animation-delay: ${5-25}s;
  }
  .background li:nth-child(28) {
      left: 21%;
      width: 55px;
      height: 55px;
      bottom: -55px;
      animation-delay: ${128-25}s;
  }
  .background li:nth-child(29) {
      left: 29%;
      width: 66px;
      height: 66px;
      bottom: -66px;
      animation-delay: ${94-25}s;
  }
  .background li:nth-child(30) {
      left: 7%;
      width: 89px;
      height: 89px;
      bottom: -89px;
      animation-delay: ${103-25}s;
  }
  .background li:nth-child(31) {
      left: 23%;
      width: 18px;
      height: 18px;
      bottom: -18px;
      animation-delay: ${23-25}s;
  }
  .background li:nth-child(32) {
      left: 39%;
      width: 36px;
      height: 36px;
      bottom: -36px;
      animation-delay: ${137-25}s;
  }
  .background li:nth-child(33) {
      left: 65%;
      width: 25px;
      height: 25px;
      bottom: -25px;
      animation-delay: ${123-25}s;
  }
  .background li:nth-child(34) {
      left: 13%;
      width: 92px;
      height: 92px;
      bottom: -92px;
      animation-delay: ${115-25}s;
  }
  .background li:nth-child(35) {
      left: 7%;
      width: 59px;
      height: 59px;
      bottom: -59px;
      animation-delay: ${86-25}s;
  }
  .background li:nth-child(36) {
      left: 83%;
      width: 54px;
      height: 54px;
      bottom: -54px;
      animation-delay: ${57-25}s;
  }
  .background li:nth-child(37) {
      left: 82%;
      width: 102px;
      height: 102px;
      bottom: -102px;
      animation-delay: ${12-25}s;
  }
  .background li:nth-child(38) {
      left: 45%;
      width: 63px;
      height: 63px;
      bottom: -63px;
      animation-delay: ${99-25}s;
  }
  .background li:nth-child(39) {
      left: 88%;
      width: 73px;
      height: 73px;
      bottom: -73px;
      animation-delay: ${7-25}s;
  }

    z-index: -1;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <Background>
          <ul className="background">
          <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
</ul>
          </Background>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
          <Footer></Footer>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

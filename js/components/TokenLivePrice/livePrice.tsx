import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { YellowCard } from '../Card'
import sgbLogo from '../../assets/images/token-logo/sgb.png'
import flrLogo from  '../../assets/images/token-logo/flr.jpg'

const PriceHolder = styled(YellowCard)`
width: fit-content;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px 10px 0px 0px;
font-size: 1.3em;

`

const TokenLogo = styled.img`
width: 30px;
height: 30px;
margin-right: 5px;
border: 0.05em solid var(--highlight2);
box-shadow: 0 0 5px var(--font4);
border-radius: 50%;
`


function TokenSymbol(id: any, loading : boolean) {
    console.log(loading)
    if (id.id == 19) {
        return <TokenLogo src={sgbLogo} alt="sgb-logo" />
    } else {
        return <TokenLogo src={flrLogo} alt="flr-logo" />
    }
    
}

export default function LivePrice() {
    const { account, chainId } = useActiveWeb3React()
    const [price, setPrice] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(true)


    let timeout: any;

    const fetchPriceFromApi = (_apiLink: string) => {
        const response = fetch(_apiLink).then((response) => {
            let data = response.json()
            data.then((data) => {
                if (chainId == 19) {
                    console.log(data.songbird.usd)
                    setPrice("$" + data.songbird.usd)
                } else {
                    setPrice("$" + data["flare-networks"].usd)
                }
                setIsLoading(false)
                clearTimeout(timeout)
            }
            )
        }).catch((error) => {
            console.log(error)
            setIsLoading(true)
            timeout = setTimeout(() => {
                fetchPriceFromApi(_apiLink)
            }
                , 10000)
            console.log(timeout)

        })
    }

    useEffect(() => {
        if (chainId == 19) {
            fetchPriceFromApi("https://api.coingecko.com/api/v3/simple/price?ids=songbird&vs_currencies=usd")
        } else {
            fetchPriceFromApi("https://api.coingecko.com/api/v3/simple/price?ids=flare-networks&vs_currencies=usd")
        }
    }, [chainId])



    if (isLoading) return (
        <PriceHolder>Loading...</PriceHolder>
    )
    return (
        <PriceHolder><TokenSymbol id={chainId} loading={isLoading}></TokenSymbol>{price}</PriceHolder>
    )
}

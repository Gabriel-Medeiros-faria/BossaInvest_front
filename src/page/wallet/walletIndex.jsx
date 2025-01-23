import styled from "styled-components"
import WalletDesktop from "./walletDesktop"
import useScreenSize from "../../utils/useScreenSize";
import WalletMobile from "./walletMobile";

export default function WalletIndex(){
    const { screenSize } = useScreenSize();
    return(
        <Container>
            {screenSize.isDesktop ? <WalletDesktop/> : <WalletMobile/>}
        </Container>
    )
}

const Container = styled.div`
margin-top: 70px;
display: flex;
align-items: center;
justify-content: center;
`
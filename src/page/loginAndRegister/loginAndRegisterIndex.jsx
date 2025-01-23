import styled from "styled-components";
import LoginAndRegisterDesktop from "./loginAndRegisterDesktop";
import LoginAndRegisterMobile from "./loginAndRegisterMobile";
import useScreenSize from "../../utils/useScreenSize";

export default function LoginAndRegisterIndex() {
  const { screenSize } = useScreenSize();
  return (
    <>
      <Container>
        {screenSize.isDesktop ? <LoginAndRegisterDesktop /> : <LoginAndRegisterMobile/>}
      </Container>
    </>
  );
}

const Container = styled.div`

`;

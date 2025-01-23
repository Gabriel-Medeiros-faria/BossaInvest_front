import styled from "styled-components";
import HomePageDesktop from "./homePageDesktop";
import { useEffect } from "react";
import useScreenSize from "../../utils/useScreenSize";
import HomePageMobile from "./homePageMobile";

export default function HomePageIndex({ setIsLoggedIn }) {
  const { screenSize } = useScreenSize();
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);
  return (
    <Container>
      {screenSize.isDesktop ? <HomePageDesktop /> : <HomePageMobile />}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

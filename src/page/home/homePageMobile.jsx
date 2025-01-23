import styled from "styled-components";
import InvestmentGridMobile from "../../components/investment/investmentGridMobile";

export default function HomePageMobile() {
  return (
    <Container>
      <InvestmentGridMobile />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
`;

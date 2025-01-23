import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Building2,
  HomeIcon,
  Landmark,
  Briefcase,
  BadgeDollarSign,
  LineChart,
  Bitcoin,
  Factory,
} from "lucide-react";
import InvestmentCard from "./investmentCard";
import { investmentAvailableApi } from "../../api/investmentAvailableApi";

// Mapeamento dos ícones por setor (opcional, para estilização extra)
const iconMapping = {
  "Tecnologia": Building2,
  "Imobiliário": HomeIcon,
  "Governamental": Landmark,
  "Bancário": Briefcase,
  "Financeiro": BadgeDollarSign,
  "Investimentos": LineChart,
  "Criptoativos": Bitcoin,
  "Infraestrutura": Factory,
};

export default function InvestmentGridMobile() {
  const [investmentOptions, setInvestmentOptions] = useState([]);

  // Função para buscar os dados da API
  useEffect(() => {
    async function fetchInvestmentOptions() {
      try {
        const response = await investmentAvailableApi();
        setInvestmentOptions(response);
      } catch (error) {
        console.error("Erro ao buscar os investimentos", error);
      }
    }

    fetchInvestmentOptions();
  }, []);

  return (
    <Container>
      <Main>
        <TitleContainer>
          <h1>Opções de Investimento</h1>
          <p>Explore as diversas opções de investimento disponíveis para diversificar sua carteira</p>
        </TitleContainer>

        <InvestmentGridStyled>
          {investmentOptions.map((option) => {
            // Mapeamento do ícone baseado no setor
            const IconComponent = iconMapping[option.sector] || Building2;

            return (
              <InvestmentCard
                key={option.id}
                option={{
                  title: option.companyName, // O nome da empresa vira o título
                  description: option.description, // A descrição do investimento
                  examples: [option.sector], // O setor será mostrado como exemplo
                  icon: IconComponent, // Ícone correspondente ao setor
                  minimumInvestment: option.minimumInvestment, // Valor mínimo de investimento
                }}
              />
            );
          })}
        </InvestmentGridStyled>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
    color: #1a202c;
  }

  p {
    color: #718096;
    font-size: 0.875rem;
  }
`;

const InvestmentGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

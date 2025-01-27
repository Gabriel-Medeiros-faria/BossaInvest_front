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
import axios from "axios";
import useUser from "../../utils/useUser";
import { investmentAvailableApi } from "../../api/investmentAvailableApi";

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

export default function InvestmentGrid() {
  const [investmentOptions, setInvestmentOptions] = useState([]);


  useEffect(() => {
    async function fetchInvestmentOptions() {
      try {
        const response = await investmentAvailableApi()
        setInvestmentOptions(response)
      } catch (error) {
        console.error("Erro ao buscar os investimentos", error);
      }
    }

    fetchInvestmentOptions();
  }, []);

  return (
    <Container>
      <main>
        <div>
          <h1>Opções de Investimento</h1>
          <p>
            Explore as diversas opções de investimento disponíveis para
            diversificar sua carteira
          </p>
        </div>

        <InvestmentGridStyled>
          {investmentOptions.map((option) => {

            const IconComponent = iconMapping[option.sector] || Building2;

            return (
              <InvestmentCard
                key={option.id}
                option={{
                  title: option.companyName, 
                  description: option.description, 
                  examples: [option.sector], 
                  icon: IconComponent, 
                  minimumInvestment: option.minimumInvestment, 
                }}
              />
            );
          })}
        </InvestmentGridStyled>
      </main>
    </Container>
  );
}

const Container = styled.div`
  main {
    div {
      h1 {
        font-size: 30px;
        margin-bottom: 20px;
        font-weight: bold;
      }
      p {
        color: gray;
      }
    }
  }
`;

const InvestmentGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

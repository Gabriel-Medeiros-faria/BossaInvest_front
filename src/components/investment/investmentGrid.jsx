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

export default function InvestmentGrid() {
  const [investmentOptions, setInvestmentOptions] = useState([]);

  // Função para buscar os dados da API
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

import styled from "styled-components";

export default function InvestmentCard({ option }) {
  const { title, description, examples, icon: IconComponent, minimumInvestment } = option;

  return (
    <Card>
      <IconComponent size={40} />
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
      <p>Investimento mínimo: R$ {Number(minimumInvestment).toFixed(2)}</p>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 18px;
    margin: 12px 0;
  }
  
  p {
    font-size: 14px;
    color: #666;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    
    li {
      font-size: 14px;
      color: #333;
    }
  }
`;

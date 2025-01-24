import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Wallet, ArrowRight, Mail, Lock, User, UserCircle } from "lucide-react";
import { loginApi } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../api/signUp";
import { getRolesApi } from "../../api/roleApi";

function LoginAndRegisterDesktop() {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({});
  const [roles, setRoles] = useState([]);
  const [messageError, setMessageError] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      loadRoles();
    }
  }, [isLogin]);

  const loadRoles = async () => {
    try {
      const rolesData = await getRolesApi();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  async function login(e) {
    e.preventDefault();
    await loginApi(inputs.email, inputs.password, navigate, setMessageError);
  }

  async function signUp(e) {
    e.preventDefault();
    const body = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      roleId: Number(inputs.roleId)
    };
    await signUpApi(body, setIsLogin);
  }

  return (
    <Container>
      <LeftPanel>
        <Logo>
          <LineChart size={32} />
          BossaInvest
        </Logo>
        <Features>
          <FeatureTitle>Invista com confiança</FeatureTitle>
          <FeatureList>
            <FeatureItem>
              <Wallet size={20} /> Investimentos diversificados
            </FeatureItem>
            <FeatureItem>
              <LineChart size={20} /> Análises em tempo real
            </FeatureItem>
            <FeatureItem>
              <ArrowRight size={20} /> Comece com qualquer valor
            </FeatureItem>
          </FeatureList>
        </Features>
      </LeftPanel>
      <RightPanel>
        <Form onSubmit={isLogin ? login : signUp}>
          <Title>{isLogin ? "Entrar" : "Criar conta"}</Title>
          {!isLogin && (
            <>
              <InputGroup>
                <IconWrapper>
                  <User size={20} />
                </IconWrapper>
                <Input
                  type="text"
                  placeholder="Nome completo"
                  name="name"
                  required
                  onChange={handleInputChange}
                />
              </InputGroup>
              <InputGroup>
                <IconWrapper>
                  <UserCircle size={20} />
                </IconWrapper>
                <Select
                  name="roleId"
                  onChange={handleInputChange}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecione seu perfil</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </>
          )}

          <InputGroup>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <Input
              type="email"
              placeholder="E-mail"
              name="email"
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <Input
              type="password"
              placeholder="Senha"
              required
              name="password"
              onChange={handleInputChange}
            />
          </InputGroup>
          

          <Button type="submit">
            {isLogin ? "Entrar" : "Criar conta"}
            <ArrowRight size={20} />
          </Button>
          <ToggleText>
            {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}
            <span onClick={toggleForm}>
              {isLogin ? "Criar conta" : "Entrar"}
            </span>
          </ToggleText>
        </Form>
        {messageError ? <p style={{color: "white", marginTop: "10px"}}>{messageError}</p> : ""}
      </RightPanel>
    </Container>
  );
}

export default LoginAndRegisterDesktop;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #1a2c38;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  background-image: url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80");
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;
  z-index: 1;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3182ce;
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #1a2c38;
    color: white;
  }

  option:disabled {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.4);
  }
`;

const ToggleText = styled.p`
  color: white;
  text-align: center;
  margin-top: 1rem;

  span {
    color: #3182ce;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Features = styled.div`
  z-index: 1;
  text-align: center;
  margin-top: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3182ce;
  }
`;
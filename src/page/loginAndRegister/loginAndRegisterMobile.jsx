import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Wallet, ArrowRight, Mail, Lock, User, UserCircle } from "lucide-react";
import { loginApi } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../api/signUp";
import { getRolesApi } from "../../api/roleApi";

function LoginAndRegisterMobile() {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({});
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("")

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
      <Logo>
        <LineChart size={24} />
        BossaInvest
      </Logo>
      <FormWrapper>
        <Form onSubmit={isLogin ? login : signUp}>
          <Title>{isLogin ? "Entrar" : "Criar conta"}</Title>
          {!isLogin && (
            <>
              <InputGroup>
                <IconWrapper>
                  <User size={18} />
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
                  <UserCircle size={18} />
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
              <Mail size={18} />
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
              <Lock size={18} />
            </IconWrapper>
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              required
              onChange={handleInputChange}
            />
          </InputGroup>

          <Button type="submit">
            {isLogin ? "Entrar" : "Criar conta"}
            <ArrowRight size={18} />
          </Button>
          <ToggleText>
            {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}
            <span onClick={toggleForm}>
              {isLogin ? "Criar conta" : "Entrar"}
            </span>
          </ToggleText>
        </Form>
        {messageError ? <p style={{color: "white", marginTop: "10px"}}>{messageError}</p> : ""}
      </FormWrapper>
    </Container>
  );
}

export default LoginAndRegisterMobile;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #1a2c38;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
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
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
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
  padding: 0.75rem;
  background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
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
  font-size: 0.875rem;

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

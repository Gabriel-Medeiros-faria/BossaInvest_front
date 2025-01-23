import React, { useState } from "react";
import styled from "styled-components";
import { BarChart3, Wallet, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "../utils/useUser";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";

function Header({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const user = useUser(); // Pegando os dados do usuário
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function logout() {
    localStorage.clear();
    setIsLoggedIn("");
    navigate("/signIn");
  }

  // Alterna a abertura/fechamento do Drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Lista de itens do Drawer (mobile)
  const drawerList = (
    <DrawerListContainer
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate("/wallet")}>
          <ListItemIcon>
            <Wallet size={20} style={{color:"#00c853"}}/>
          </ListItemIcon>
          <ListItemText primary="Carteiras" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <User size={20} style={{color:"#00c853"}}/>
          </ListItemIcon>
          <ListItemText primary={`Clique para sair, ${user.name}!`} />
        </ListItem>
      </List>
    </DrawerListContainer>
  );

  return (
    <div>
      <HeaderContainer>
        <Nav>
          <Logo onClick={() => navigate("/")}>
            <BarChart3 size={24} />
            <span>BossaInvest</span>
          </Logo>

          {/* Menu Items for desktop */}
          <MenuItems>
            <MenuItem href="/wallet">
              <Wallet size={20}/>
              <span>Carteiras</span>
            </MenuItem>
            <MenuItem onClick={logout}>
              <User size={20} />
              <span>Clique para sair {user.name}!</span>
            </MenuItem>
          </MenuItems>

          {/* Mobile menu button */}
          <MobileMenuButton onClick={!isDrawerOpen ? toggleDrawer(true) : toggleDrawer(false)}>
            <Menu size={24} />
          </MobileMenuButton>

          {/* Drawer for mobile */}
          <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
        </Nav>
      </HeaderContainer>
    </div>
  );
}

export default Header;

// Styled Components
const HeaderContainer = styled.header`
  width: 100vw;
  background: #1a2c38;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 9999;
  top: 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00c853;
  font-weight: 700;
  font-size: 1.5rem;
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #00c853;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: #00c853;
  }
`;

const DrawerListContainer = styled.div`
position: fixed;
top: 70px;
  width: 100%;
  background: #1a2c38;
  height: 120px;
  color: white;

  .MuiListItem-root {
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

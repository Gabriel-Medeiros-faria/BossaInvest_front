import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/globalStyle";
import ScreenSizeProvider from "./context/screenContext";
import HomePageIndex from "./page/home/homePageIndex";
import Header from "./components/header";
import LoginAndRegisterIndex from "./page/loginAndRegister/loginAndRegisterIndex";
import WalletIndex from "./page/wallet/walletIndex";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const isUserAuthenticated = () => {
    // Verificar se há um usuário de autenticação armazenado localmente
    const logged = localStorage.getItem("accessToken")

    // Retornar verdadeiro se houver um usuário de autenticação válido
    return !!logged
  };
  
  // Componente de redirecionamento para a página de login caso o usuário não esteja logado 
  const PrivateRoute = ({ element }) => {
    return isUserAuthenticated() ? (
      element
    ) : (
      <Navigate to="/signIn" replace />
    );
  };
  return (
    <>
      <BrowserRouter>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
      {/* <Header/> */}
        <GlobalStyle />
        <ScreenSizeProvider>
          <Routes>
            {/* <Route path="/" element={<HomePageIndex />} /> */}
            <Route path="/" element={<PrivateRoute element={<HomePageIndex setIsLoggedIn={setIsLoggedIn}/>} />} />
            <Route path="/signIn" element={<LoginAndRegisterIndex />} />
            <Route path="/wallet" element={<WalletIndex />} />
          </Routes>
        </ScreenSizeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

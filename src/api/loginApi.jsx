import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const loginApi = async (email, password, navigate) => {
  try {
    const response = await axios.post("http://localhost:5100/auth/login", { email, password });
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    const { access_token } = response.data;
    localStorage.setItem("accessToken", access_token);
    // localStorage.setItem('refreshToken', refresh_token)

    // Descriptografo o token para poder pegar as informações do usuário salva nele
    const decodedToken = jwtDecode(access_token)

    // Seto meu localStorage com as informações do usuário para poder usá-la no hook useUser() e poder usar o useUser() em qualquer lugar do código e ficar mais semântico
    localStorage.setItem('user', JSON.stringify(decodedToken))

    navigate("/");
    return response.data;
  } catch (err) {
    console.error("Login Error: ", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

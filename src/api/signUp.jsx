import axios from "axios";


export const signUpApi = async (body, setIsLogin) => {
  try {
    const response = await axios.post("http://localhost:5100/users", body);
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    setIsLogin(true);
  } catch (err) {
    console.error("signUp Error: ", err.response?.data || err.message);
    throw new Error(err.response?.data?.message);
  }
};

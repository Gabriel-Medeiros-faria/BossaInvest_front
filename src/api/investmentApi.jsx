import axios from "axios";

export const createInvestmentApi = async (walletId, investmentData) => {
  console.log(investmentData);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post(
      "http://localhost:5100/investment",
      { walletId, ...investmentData },
      config
    );
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    console.log("createInvestment Response:", response);
    return response.data;
  } catch (err) {
    console.error(
      "createInvestment Error: ",
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

export const deleteInvestmentApi = async (investmentId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.delete(
      `http://localhost:5100/investment/${investmentId}`,
      config
    );

    if (response.status === 200) {
      console.log("Investimento deletado com sucesso");
      return response.data;
    }
  } catch (error) {
    console.error("Erro ao deletar investimento:", error);
    throw new Error(error.response?.data?.message || "Erro ao deletar investimento.");
  }
};
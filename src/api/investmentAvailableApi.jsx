import axios from "axios";


export const investmentAvailableApi = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.get(
      "http://localhost:5100/investment-available",
      config
    );
    if (!response || !response.data) {
        throw new Error("Unexpected response from server.");
    }
    return response.data
  } catch (err) {
    console.error(
      "investment-available Error: ",
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

import axios from "axios";
import useUser from "../utils/useUser";

export const getWalletApi = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const id = useUser().sub
    const response = await axios.get(`http://localhost:5100/wallet/${id}`, config);
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    return response.data;
  } catch (err) {
    console.error(
      "getWallet Error: ",
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

export const createWalletApi = async (body) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post("http://localhost:5100/wallet", body, config);
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    return response.data;
  } catch (err) {
    console.error(
      "createWallet Error: ",
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

export const deleteWalletApi = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.delete(`http://localhost:5100/wallet/${id}`, config);
    if (!response || !response.data) {
      throw new Error("Unexpected response from server.");
    }
    return response.data;
  } catch (err) {
    console.error(
      "deleteWallet Error: ",
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message);
  }
};

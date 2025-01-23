import axios from "axios";

export const getRolesApi = async () => {
    try {

      const response = await axios.get("http://localhost:5100/roles");
      if (!response || !response.data) {
        throw new Error("Unexpected response from server.");
      }
      return response.data;
    } catch (err) {
      console.error(
        "getRoles Error: ",
        err.response?.data || err.message
      );
      throw new Error(err.response?.data?.message);
    }
  };
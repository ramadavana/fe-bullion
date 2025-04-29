import axios from "axios";
import { getCookie } from "cookies-next";
import apiEndpoints from "./apiEndpoints";

export const updateUser = async (id, userData) => {
  try {
    const token = getCookie("token");
    const response = await axios.put(
      apiEndpoints.admin.updateUser(id),
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

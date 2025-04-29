import axios from "axios";
import { getCookie } from "cookies-next";
import apiEndpoints from "./apiEndpoints";

export const getUserDetail = async (userId) => {
  try {
    const token = getCookie("token"); // Assuming the token is stored in cookies with the key 'token'

    const response = await axios.get(
      apiEndpoints.admin.getDetailedUser(userId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === 200 && !response.data.iserror) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

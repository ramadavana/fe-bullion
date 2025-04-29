// src/services/userServices.js
import axios from "axios";
import { getCookie } from "cookies-next";
import apiEndpoints from "./apiEndpoints";

export async function getUserList(offset = 0, limit = 10) {
  try {
    const token = getCookie("token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(apiEndpoints.admin.getUsersList, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);

    if (error.response) {
      return {
        error: true,
        message: error.response.data?.err_message_en || "Something went wrong",
      };
    }

    return {
      error: true,
      message: error.message,
    };
  }
}

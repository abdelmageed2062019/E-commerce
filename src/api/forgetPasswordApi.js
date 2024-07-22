import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const forgetPassword = (email) =>
  axios.post(`${API_URL}/auth/forgotPasswords`, { email });

export const verifyResetCode = (code) =>
  axios.post(`${API_URL}/auth/verifyResetCode`, { resetCode: code });

export const resetPassword = (userData) =>
  axios.put(`${API_URL}/auth/resetPassword`, userData);

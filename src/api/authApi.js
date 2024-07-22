import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1/auth";

export const register = (userData) => axios.post(`${API_URL}/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/signin`, userData);

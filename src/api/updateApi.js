import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

const getToken = () => {
  return localStorage.getItem("token");
};

const createHeaders = () => {
  const token = getToken();
  return token ? { token } : {};
};

export const updateUser = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/updateMe/`, userData, {
      headers: createHeaders(),
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.errors.msg);
  }
};

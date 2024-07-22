import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const getUserOrders = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/orders/user/${userID}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch wishlist");
  }
};

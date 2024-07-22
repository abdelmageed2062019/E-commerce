import axios from "axios";
import { getToken } from "../utils/tokenUtils";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

const createHeaders = () => {
  const token = getToken();
  return token ? { token } : {};
};

export const createCashOrder = async (cartId, shippingAddress) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/${cartId}`,
      { shippingAddress },
      {
        headers: createHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create cash order:", error);
    throw error;
  }
};

export const createCardOrder = async (cartId, shippingAddress) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/checkout-session/${cartId}?url=http://localhost:5173/`,
      { shippingAddress },
      {
        headers: createHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create card order:", error);
    throw error;
  }
};

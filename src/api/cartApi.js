import axios from "axios";
import { hasToken, getToken } from "../utils/tokenUtils";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

const createHeaders = () => {
  const token = getToken();
  return token ? { token } : {};
};

export const addProductToCart = async (productId) => {
  if (!hasToken()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/cart`,
      { productId },
      { headers: createHeaders() }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add product to cart");
  }
};

export const updateCartProductQuantity = async (productId, count) => {
  if (!hasToken()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/cart/${productId}`,
      { count: Number(count) },
      { headers: createHeaders() }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update product quantity");
  }
};

export const getUserCart = async () => {
  if (!hasToken()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: createHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeCartItem = async (productId) => {
  if (!hasToken()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(`${API_URL}/cart/${productId}`, {
      headers: createHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove cart item");
  }
};

export const clearUserCart = async () => {
  if (!hasToken()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(`${API_URL}/cart`, {
      headers: createHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to clear cart");
  }
};

import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

const getToken = () => {
  return localStorage.getItem("token");
};

const createHeaders = () => {
  const token = getToken();
  return token ? { token } : {};
};

export const addProductToWishlist = async (productId) => {
  const headers = createHeaders();

  if (!headers.token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/wishlist`,
      { productId },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add product to wishlist");
  }
};

export const getUserWishlist = async () => {
  const headers = createHeaders();

  if (!headers.token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/wishlist`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch wishlist");
  }
};

export const removeWishlistItem = async (productId) => {
  const headers = createHeaders();

  if (!headers.token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(`${API_URL}/wishlist/${productId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove wishlist item");
  }
};

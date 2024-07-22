import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        page,
        limit,
      },
    });

    const { data, metadata } = response.data;

    return {
      products: data,
      totalPages: metadata.numberOfPages,
    };
  } catch (error) {
    throw Error("Failed to fetch products");
  }
};

export const fetchSingleProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);

    const { data } = response.data;
    return {
      product: data,
    };
  } catch (error) {
    throw Error("Failed to fetch product");
  }
};

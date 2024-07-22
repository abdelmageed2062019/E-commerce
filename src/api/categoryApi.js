import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const fetchCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);

    const { data } = response.data;

    return {
      categories: data,
    };
  } catch (error) {
    throw Error("Failed to fetch categories");
  }
};

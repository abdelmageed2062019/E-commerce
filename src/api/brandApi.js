import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export const fetchBrand = async () => {
  try {
    const response = await axios.get(`${API_URL}/brands`);

    const { data } = response.data;
    console.log(data);
    return {
      brands: data,
    };
  } catch (error) {
    throw Error("Failed to fetch brands");
  }
};

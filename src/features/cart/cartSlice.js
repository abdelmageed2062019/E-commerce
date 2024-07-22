import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToCart as addProductToCartAPI,
  updateCartProductQuantity as updateCartProductQuantityAPI,
  getUserCart as getUserCartAPI,
  removeCartItem as removeCartItemAPI,
  clearUserCart as clearUserCartAPI,
} from "../../api/cartApi";

// Async thunk for adding product to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await addProductToCartAPI(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating product quantity
export const updateCartProductQuantity = createAsyncThunk(
  "cart/updateCartProductQuantity",
  async ({ productId, count }, { rejectWithValue }) => {
    try {
      const { data } = await updateCartProductQuantityAPI(productId, count);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting user cart
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUserCartAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for removing cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await removeCartItemAPI(productId);
      return { productId, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for clearing user cart
export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await clearUserCartAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: 0,
    totalCartPrice: 0,
    status: "idle",
    error: null,
    id: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
          state.count = action.payload.products.length;
          state.totalCartPrice = action.payload.totalCartPrice;
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartProductQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
          state.count = action.payload.products.length;
          state.totalCartPrice = action.payload.totalCartPrice;
        }
      })
      .addCase(updateCartProductQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
          state.count = action.payload.products.length;
          state.totalCartPrice = action.payload.totalCartPrice;
          state.id = action.payload._id;
        }
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
          state.count = action.payload.products.length;
          state.totalCartPrice = action.payload.totalCartPrice;
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.count = 0;
        state.totalCartPrice = 0;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

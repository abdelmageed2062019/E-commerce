import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToWishlist as addProductToWishlistAPI,
  getUserWishlist as getUserWishlistAPI,
  removeWishlistItem as removeWishlistItemAPI,
} from "../../api/wishApi";

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await addProductToWishlistAPI(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await getUserWishlistAPI(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  "cart/removeWishlistItem",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await removeWishlistItemAPI(productId);
      return { productId, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
        }
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeWishlistItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.products;
        }
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;

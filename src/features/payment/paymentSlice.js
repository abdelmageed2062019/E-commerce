import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCashOrder, createCardOrder } from "../../api/paymentApi";

// Thunk for creating cash order
export const createCashOrderThunk = createAsyncThunk(
  "payment/createCashOrder",
  async ({ cartId, shippingAddress }, thunkAPI) => {
    try {
      const response = await createCashOrder(cartId, shippingAddress);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Thunk for creating card order
export const createCardOrderThunk = createAsyncThunk(
  "payment/createCardOrder",
  async ({ cartId, shippingAddress }, thunkAPI) => {
    try {
      const response = await createCardOrder(cartId, shippingAddress);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    cashOrder: {
      order: null,
      loading: false,
      error: null,
    },
    cardOrder: {
      order: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    clearCashOrder: (state) => {
      state.cashOrder.order = null;
      state.cashOrder.loading = false;
      state.cashOrder.error = null;
    },
    clearCardOrder: (state) => {
      state.cardOrder.order = null;
      state.cardOrder.loading = false;
      state.cardOrder.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle cash order
    builder
      .addCase(createCashOrderThunk.pending, (state) => {
        state.cashOrder.loading = true;
        state.cashOrder.error = null;
      })
      .addCase(createCashOrderThunk.fulfilled, (state, action) => {
        state.cashOrder.loading = false;
        state.cashOrder.order = action.payload;
      })
      .addCase(createCashOrderThunk.rejected, (state, action) => {
        state.cashOrder.loading = false;
        state.cashOrder.error = action.payload;
      });

    // Handle card order
    builder
      .addCase(createCardOrderThunk.pending, (state) => {
        state.cardOrder.loading = true;
        state.cardOrder.error = null;
      })
      .addCase(createCardOrderThunk.fulfilled, (state, action) => {
        state.cardOrder.loading = false;
        state.cardOrder.order = action.payload;
      })
      .addCase(createCardOrderThunk.rejected, (state, action) => {
        state.cardOrder.loading = false;
        state.cardOrder.error = action.payload;
      });
  },
});

export const { clearCashOrder, clearCardOrder } = paymentSlice.actions;
export default paymentSlice.reducer;

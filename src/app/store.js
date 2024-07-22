import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import userReducer from "../features/update/updateSlice";
import paymentReducer from "../features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    wishlist: wishlistReducer,
    payment: paymentReducer,
    user: userReducer,
  },
});

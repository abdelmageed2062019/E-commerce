import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { setCredentials } from "./features/auth/authSlice";
import { getToken, decodeToken } from "./utils/tokenUtils";

import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Navbar from "./components/Navbar/Navbar";

import CategoriesPage from "./pages/CategoriesPage";
import BrandsPage from "./pages/BrandsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import SingleProductPage from "./pages/SingleProductPage";
import WishlistPage from "./pages/WishlistPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ShippingAddress from "./pages/ShippingAddress";
import ForgetPassPage from "./pages/ForgetPassPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserCart } from "./features/cart/cartSlice";
import OrdersPage from "./pages/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const user = decodeToken(token);
      dispatch(setCredentials({ user, token }));
      dispatch(getUserCart());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/allorders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/shippingAddress/:cartId"
              element={
                <ProtectedRoute>
                  <ShippingAddress />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UpdateProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:productId"
              element={
                <ProtectedRoute>
                  <SingleProductPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/brands"
              element={
                <ProtectedRoute>
                  <BrandsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            <Route
              path="/forgetPassword"
              element={
                <PublicRoute>
                  <ForgetPassPage />
                </PublicRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </main>
      </Router>
    </>
  );
};

export default App;

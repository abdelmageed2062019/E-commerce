import { useEffect } from "react";

import CartItem from "../components/CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, clearUserCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CartPage = () => {
  const dispatch = useDispatch();

  const { items, status, error, count, id } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearUserCart());
    toast.success("Cart cleared successfully!");
  };

  return (
    <div className="container py-5">
      <div className="text-white d-flex align-align-items-center justify-content-between">
        <h2>Shopping Cart</h2>
        <p>Total items: {count}</p>
      </div>

      {status === "loading" && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      {status === "failed" && <div className="text-white">{error}</div>}
      <ul className="cart-list">
        {items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>

      <div className="d-flex align-items-center justify-content-between">
        <div className="clear">
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>

        <div className="pay">
          <button disabled={count === 0} className="btn btn-primary rounded-0">
            <Link to={`/shippingAddress/${id}`} className="text-white">
              Pay Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

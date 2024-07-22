import "./CartItem.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  updateCartProductQuantity,
  removeCartItem,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      dispatch(removeCartItem(productId))
        .unwrap()
        .then(() => {
          toast.success("Item removed from cart");
        })
        .catch((error) => {
          toast.error("Failed to remove item from cart");
          console.error("Failed to remove item from cart:", error);
        });
    } else {
      dispatch(updateCartProductQuantity({ productId, count: quantity }))
        .unwrap()
        .then(() => {
          toast.success("Item quantity updated");
        })
        .catch((error) => {
          toast.error("Failed to update item quantity");
          console.error("Failed to update item quantity:", error);
        });
    }
  };

  const product = item.product || {};
  const category = product.category || {};
  const brand = product.brand || {};

  return (
    <div className="shoppping-cart">
      <div className="item">
        <div className="buttons">
          <i
            className="fa-solid fa-trash text-danger"
            onClick={() => handleUpdateQuantity(product._id, 0)}
          ></i>
          <Link to={`/product/${product._id}`}>
            <i className="fa-regular fa-eye"></i>
          </Link>
        </div>

        <div className="image">
          <img
            src={product.imageCover || "placeholder.jpg"}
            alt={product.title || "Product"}
          />
        </div>

        <div className="description">
          <span>{category.name || "Category"}</span>
          <span>{brand.name || "Brand"}</span>
          <span>
            {product.ratingsAverage || "Rating"}{" "}
            <i className="fa-solid fa-star"></i>
          </span>
        </div>

        <div className="quantity">
          <button
            className="plus-btn"
            type="button"
            name="button"
            onClick={() => handleUpdateQuantity(product._id, item.count + 1)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <input type="text" name="name" value={item.count} readOnly />
          <button
            className="minus-btn"
            type="button"
            name="button"
            onClick={() => handleUpdateQuantity(product._id, item.count - 1)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>

        <div className="total-price">{item.price * item.count} $</div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    count: PropTypes.number.isRequired,
    product: PropTypes.shape({
      _id: PropTypes.string,
      imageCover: PropTypes.string,
      title: PropTypes.string,
      ratingsAverage: PropTypes.number,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
      brand: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;

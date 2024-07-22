import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { trimTitle } from "../../utils/trim";
import "./Product.css";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  removeWishlistItem,
  getUserWishlist,
} from "../../api/wishApi";

const Product = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();
  const trimmedTitle = trimTitle(product.title, 15);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const wishlistItems = await getUserWishlist();
        const inWishlist = wishlistItems.data.some(
          (item) => item._id === product._id
        );
        setIsInWishlist(inWishlist);
      } catch (error) {
        console.error("Failed to check wishlist status:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      checkWishlistStatus();
    } else {
      console.warn("No token found");
    }
  }, [product._id]);

  const handleAddToCart = async (productId, event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resultAction = await dispatch(addProductToCart(productId)).unwrap();
      toast.success(resultAction.message || "Product added to cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = async (productId, event) => {
    event.preventDefault();
    try {
      if (isInWishlist) {
        await removeWishlistItem(productId);
        setIsInWishlist(false);
        toast.success("Product removed from wishlist");
      } else {
        await addProductToWishlist(productId);
        setIsInWishlist(true);
        toast.success("Product added to wishlist");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error(
        isInWishlist
          ? "Failed to remove product from wishlist"
          : "Failed to add product to wishlist"
      );
    }
  };

  return (
    <div className="col-md-4 col-lg-3">
      <Link to={`/product/${product._id}`}>
        <div className="card m-auto w-100">
          <i
            className={`fas fa-heart fav ${isInWishlist ? "in-wishlist" : ""}`}
            onClick={(event) => handleWishlistToggle(product._id, event)}
          ></i>
          <div className="imgBox">
            <img
              src={product.imageCover}
              className="mouse"
              alt={product.slug}
            />
          </div>
          <div className="contentBox">
            <h3>{trimmedTitle}</h3>
            <div className="contentPriceRate">
              <p className="price">{product.price} €</p>
              <p>
                <i className="fa-solid fa-star"></i> {product.ratingsAverage}
              </p>
            </div>
            <button
              className="buy border-0"
              onClick={(event) => handleAddToCart(product._id, event)}
            >
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;

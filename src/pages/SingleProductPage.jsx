import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../api/productApi";
import Carousel from "react-multi-carousel";

import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";

import "react-multi-carousel/lib/styles.css";
import "../styles/ProductDetails.css";

import { toast } from "react-toastify";

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = async (productId, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resultAction = await dispatch(addProductToCart(productId)).unwrap();
      toast.success(resultAction.message || "Product added to cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { product } = await fetchSingleProduct(productId);
        setProduct(product);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log(product);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-5 single-product">
      {product ? (
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="w-50">
              <Carousel
                keyBoardControl={false}
                infinite={true}
                responsive={responsive}
                autoPlay={true}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              >
                {product.images.map((image, index) => (
                  <img
                    src={image}
                    alt="img"
                    key={index}
                    className="img-fluid"
                  />
                ))}
              </Carousel>
              ;
            </div>
          </div>

          <div className="col-md-6">
            <div className="product-description">
              <span>{product.category.name}</span>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="text-white">{product.brand.name}</p>
              <div>
                <p className="text-white">
                  {product.ratingsAverage}
                  <i className="fa-solid fa-star"></i>
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <span className="text-white">{product.price}$</span>

              <button
                className="buy border-0"
                onClick={(event) => handleAddToCart(product._id, event)}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No product details found.</p>
      )}
    </div>
  );
};

export default SingleProductPage;

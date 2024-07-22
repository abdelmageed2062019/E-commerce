import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import Product from "../Product/Product";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const currentPage = useSelector((state) => state.products.currentPage);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    }
  }, [currentPage, dispatch, productStatus]);

  let content;

  if (productStatus === "loading") {
    content = <span className="loader"></span>;
  } else if (productStatus === "succeeded") {
    content = (
      <>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </>
    );
  } else if (productStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="py-5">
      <div className="row gx-2 gy-3 ">{content}</div>
    </div>
  );
};

export default ProductsList;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../features/brand/brandSlice";

const BrandsPage = () => {
  const dispatch = useDispatch();
  const { items, error, status } = useSelector((state) => state.brands);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBrands());
    }
  }, [dispatch, status]);

  let content;

  if (status === "loading") {
    content = (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="container py-5">
        <div className="row g-2">
          {items.brands.map((brand) => (
            <div
              className="col d-flex justify-content-center mb-5"
              key={brand._id}
            >
              <div className="card">
                <img
                  src={brand.image}
                  className="card-img-top"
                  alt={brand.slug}
                />
                <div className="card-body">
                  <h5 className="card-title text-white">{brand.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (status === "failed") {
    content = <p>Error: {error}</p>;
  }

  return <>{content}</>;
};

export default BrandsPage;

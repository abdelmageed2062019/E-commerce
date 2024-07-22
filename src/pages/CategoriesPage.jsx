import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items, error, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
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
      <div className="container py-5 d-flex align-items-center justify-content-center">
        <div
          id="carouselExampleRide"
          className="carousel carousel-fade carousel-dark"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {items.categories.map((category, index) => (
              <div
                key={category._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ width: "600px" }}
              >
                <img
                  src={category.image}
                  className="d-block m-auto w-100 img-fluid"
                  alt={category.slug}
                  style={{ width: "200px" }}
                />
                <div className="carousel-caption d-none d-md-block text-white fs-2">
                  <h5>{category.name}</h5>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  } else if (status === "failed") {
    content = <p>Error: {error}</p>;
  }

  return <>{content}</>;
};

export default CategoriesPage;

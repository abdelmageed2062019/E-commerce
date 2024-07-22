import PropTypes from "prop-types";
import "./WishlistItem.css";
import { Link } from "react-router-dom";

const WishlistItem = ({ item }) => {
  return (
    <div className="col-md-4 p-5">
      <Link to={`/product/${item._id}`}>
        <div className="imgBox">
          <img src={item.imageCover} alt={item.title} className="img-fluid" />
        </div>
        <div className="d-flex flex-column mt-4">
          <h3 className="fs-5 text-white">{item.title}</h3>
          <div className="d-flex align-items-center justify-content-between text-white">
            <p className="price">{item.price} €</p>
            <p>
              <i className="fa-solid fa-star"></i> {item.ratingsAverage}
            </p>
          </div>
          <div>
            <p className="text-white">
              <span className="d-inline text-muted">Brand:</span>{" "}
              {item.brand.name}
            </p>
            <p className="text-white">
              <span className="d-inline text-muted">Category:</span>{" "}
              {item.category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

WishlistItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
  }).isRequired,
};

export default WishlistItem;

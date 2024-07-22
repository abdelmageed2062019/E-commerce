import { useEffect } from "react";

import WishlistItem from "../components/WishlistItem/WishlistItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <div className="container py-5">
      <h2 className="text-white">Wishlist</h2>

      {status === "loading" && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {status === "succeeded" && items.length > 0 ? (
        <div className="row">
          {items.map((item) => (
            <WishlistItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-white">No items in wishlist</p>
      )}
    </div>
  );
};

export default WishlistPage;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCashOrderThunk,
  createCardOrderThunk,
  clearCashOrder,
  clearCardOrder,
} from "../features/payment/paymentSlice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const cartId = params.cartId;

  const { cashOrder, cardOrder } = useSelector((state) => state.payment);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cashOrder.order) {
      toast.success("Cash order created successfully!");
      dispatch(clearCashOrder());
    }
    if (cashOrder.error) {
      toast.error(cashOrder.error);
    }
    if (cardOrder.order) {
      toast.success("Card order created successfully!");
      window.location.href = cardOrder.order.session.url;
      dispatch(clearCardOrder());
    }
    if (cardOrder.error) {
      toast.error(cardOrder.error);
    }
  }, [cashOrder, cardOrder, dispatch]);

  const onSubmitCashOrder = (data) => {
    dispatch(createCashOrderThunk({ cartId, shippingAddress: data }));
  };

  const onSubmitCardOrder = (data) => {
    dispatch(createCardOrderThunk({ cartId, shippingAddress: data }));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-white">Create Order</h1>
      <form className="p-5">
        <div className="form-group w-100">
          <label htmlFor="details">Details</label>
          <input
            type="text"
            className={`${errors.details ? "is-invalid" : ""}`}
            id="details"
            {...register("details", { required: "Details are required" })}
          />
          {errors.details && (
            <div className="invalid-feedback">{errors.details.message}</div>
          )}
        </div>
        <div className="form-group w-100">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className={`${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>
        <div className="form-group w-100">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className={`${errors.city ? "is-invalid" : ""}`}
            id="city"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <div className="invalid-feedback">{errors.city.message}</div>
          )}
        </div>
        <div className="d-flex justify-content-between w-100">
          <button
            type="button"
            className="btn btn-primary rounded-0"
            onClick={handleSubmit(onSubmitCashOrder)}
            disabled={cashOrder.loading}
          >
            {cashOrder.loading ? "Loading..." : "Pay Cash"}
          </button>
          <button
            type="button"
            className="btn btn-secondary rounded-0"
            onClick={handleSubmit(onSubmitCardOrder)}
            disabled={cardOrder.loading}
          >
            {cardOrder.loading ? "Loading..." : "Pay with Card"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ShippingAddress;

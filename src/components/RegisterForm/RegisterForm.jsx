import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./register.css";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const password = watch("password");

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <h2>Register new account</h2>
        <div className="form-input">
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters long",
              },
            })}
            placeholder="Name"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-input">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-input">
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10,15}$/,
                message: "Phone number must be between 10 and 15 digits",
              },
            })}
            placeholder="Phone Number"
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div className="form-input">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
                message:
                  "Password must include at least one capital letter, one number, and one special character",
              },
            })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-input">
          <input
            type="password"
            {...register("rePassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm Password"
          />
          {errors.rePassword && <p>{errors.rePassword.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Register"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./login.css";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit(onSubmit)} className="py-5">
        <h2>Login</h2>
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

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Login"}
        </button>

        <div className="d-flex alig-items-center justify-content-around w-100 px-5">
          <Link to={"/forgetPassword"}>Forget Password</Link>
          <Link to={"/register"}>Have Account?</Link>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

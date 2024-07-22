import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "../../api/forgetPasswordApi";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleNextStep = async (data) => {
    setLoading(true);

    try {
      if (step === 1) {
        await forgetPassword(data.email);
        setEmail(data.email);
        toast.success("Reset code sent to your email!");
      } else if (step === 2) {
        await verifyResetCode(data.resetCode);
        toast.success("Reset code verified!");
      } else if (step === 3) {
        await resetPassword({ email, newPassword: data.newPassword });
        toast.success("Password reset successfully!");
        navigate("/login");
      }
      setStep(step + 1);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    reset();
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-white">Forgot Password</h1>
      <form onSubmit={handleSubmit(handleNextStep)} className="p-5">
        {step === 1 && (
          <div className="form-group w-100">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
              disabled={loading}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="form-group w-100">
            <label htmlFor="resetCode">Reset Code</label>
            <input
              type="text"
              id="resetCode"
              className={`${errors.resetCode ? "is-invalid" : ""}`}
              {...register("resetCode", { required: "Reset code is required" })}
              disabled={loading}
            />
            {errors.resetCode && (
              <div className="invalid-feedback">{errors.resetCode.message}</div>
            )}
          </div>
        )}
        {step === 3 && (
          <>
            <div className="form-group w-100">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                readOnly
                className="form-control-plaintext text-white"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className={`${errors.newPassword ? "is-invalid" : ""}`}
                {...register("newPassword", {
                  required: "Password is required",
                })}
                disabled={loading}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">
                  {errors.newPassword.message}
                </div>
              )}
            </div>
          </>
        )}
        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={loading}
              className="mx-4"
            >
              Previous
            </button>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : step === 3 ? "Reset Password" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

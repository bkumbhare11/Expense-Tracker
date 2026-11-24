import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { Lock } from "reicon-react";
import Logo from "@/components/Logo";
import { resetPassword } from "@/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submit(data) {
    try {
      let res = await resetPassword(data.password);
      toast.success(res.message);
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Logo />

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-[#F5F5F5] border border-slate-100 w-full max-w-md sm:max-w-lg rounded-xl space-y-6 p-4 sm:p-7"
      >
        <div className="space-y-1">
          <h2 className="font-semibold tracking-tight flex items-center gap-1.5 text-lg sm:text-2xl">
            Reset password <FaLock className="text-xl sm:text-2xl " />
          </h2>
          <p className="font-semibold tracking-tight text-xs sm:text-sm ">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="font-medium text-sm sm:text-base"
          >
            Password
          </label>
          <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
            <Lock size={20} />
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full focus:outline-none text-base"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-sm sm:text-base"
          >
            Confirm Password
          </label>
          <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
            <Lock size={20} />
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Enter old password"
              className="w-full focus:outline-none text-base"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button className="bg-black text-white font-bold w-full py-2 sm:py-2.5 text-sm sm:text-lg rounded-xl active:scale-95 hover:bg-[#e2e2e2] hover:text-black transition-all duration-300 ease-in-out cursor-pointer">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { Lock } from "reicon-react";
import toast from "react-hot-toast";
import { changePassword, logoutUser } from "@/services/authService";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function ChangePassword() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submit(data) {
    try {
      let res = await changePassword(data);
      console.log(res);
      toast.success(res.message);
      await logoutUser();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error.response?.data?.message);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to change password");
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
            Change password <FaLock className="text-xl sm:text-2xl " />
          </h2>
          <p className="font-semibold tracking-tight text-xs sm:text-sm ">
            Update your password to keep your account safe.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="oldPassword"
            className="font-medium text-sm sm:text-base"
          >
            Old Password
          </label>
          <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
            <Lock size={20} />
            <input
              type="password"
              id="oldPassword"
              {...register("oldPassword")}
              placeholder="Enter old password"
              className="w-full focus:outline-none text-base"
            />
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="newPassword"
            className="font-medium text-sm sm:text-base"
          >
            New Password
          </label>
          <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
            <Lock size={20} />
            <input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              placeholder="Enter new password"
              className="w-full focus:outline-none text-base"
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.newPassword.message}
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
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;

import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { Envelope } from "reicon-react";
import { Lock } from "reicon-react";
import { User4 } from "reicon-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";
import { registerUser } from "@/services/authService";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function submit(data) {
    try {
      const res = await registerUser(data);
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
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
          <h2 className="font-semibold tracking-tight flex items-center gap-2 text-lg sm:text-2xl">
            Create your account{" "}
            <FaUserPlus className="text-2xl sm:text-3xl text-slate-950" />
          </h2>
          <p className="font-semibold tracking-tight text-sm ">
            Start managing your money today{" "}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-sm sm:text-base">
              Name
            </label>
            <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
              <User4 size={20} />
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter name"
                className="w-full focus:outline-none text-base"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-sm sm:text-base">
              Email
            </label>
            <div className="flex items-center gap-2 border px-3 py-2 sm:py-2.5 rounded-xl text-slate-500 border-slate-300 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-600/30  focus-within:text-slate-900">
              <Envelope size={20} />
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter email"
                className="w-full focus:outline-none text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.email.message}
              </p>
            )}
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
                placeholder="Enter password"
                className="w-full focus:outline-none text-base"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            className="bg-black text-white font-bold w-full py-2.5 sm:py-2.5 text-sm sm:text-lg rounded-xl active:scale-95 hover:bg-[#e2e2e2] hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
          >
            Register
          </button>

          <p className="font-medium text-center text-slate-500 text-xs pt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-slate-950 hover:underline cursor-pointer font-bold"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;

import Logo from "../components/Logo";
import { PiHandWavingDuotone } from "react-icons/pi";
import { Envelope } from "reicon-react";
import { Lock } from "reicon-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { loginUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  async function submit(data) {
    try {
      const res = await loginUser(data);
      setUser(res.data);
      toast.success(res.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
          <h2 className="font-semibold tracking-tight flex items-center gap-1 text-lg sm:text-2xl">
            Welcome Back{" "}
            <PiHandWavingDuotone className="text-2xl sm:text-3xl " />
          </h2>
          <p className="font-semibold tracking-tight text-sm ">
            Login to manage your finances{" "}
          </p>
        </div>

        <div className="space-y-4">
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
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="uppercase text-[10px] font-semibold text-red-600 text-left my-1 cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button className="bg-black text-white font-bold w-full py-2 sm:py-2.5 text-sm sm:text-lg rounded-xl active:scale-95 hover:bg-[#e2e2e2] hover:text-black transition-all duration-300 ease-in-out cursor-pointer">
            Login
          </button>

          <p className="font-medium text-center text-slate-500 text-xs pt-2">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-slate-950 hover:underline cursor-pointer font-bold"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

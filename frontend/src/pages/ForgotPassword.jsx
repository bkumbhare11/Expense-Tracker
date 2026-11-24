import Logo from "@/components/Logo";
import { FaLock } from "react-icons/fa6";
import { Envelope } from "reicon-react";
import { forgotPasswordSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/services/authService";
import toast from "react-hot-toast";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function sendLink(data) {
    try {
      let res = await forgotPassword(data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Logo />

      <form
        onSubmit={handleSubmit(sendLink)}
        className="bg-[#F5F5F5] border border-slate-100 w-full max-w-md sm:max-w-lg rounded-xl space-y-6 p-4 sm:p-7"
      >
        <div className="space-y-1">
          <h2 className="font-semibold tracking-tight flex items-center gap-1.5 text-lg sm:text-2xl">
            Forgot Password? <FaLock className="text-xl sm:text-2xl " />
          </h2>
          <p className="font-semibold tracking-tight text-sm ">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
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

        <button className="bg-black text-white font-bold w-full py-2 sm:py-2.5 text-sm sm:text-lg rounded-xl active:scale-95 hover:bg-[#e2e2e2] hover:text-black transition-all duration-300 ease-in-out cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;

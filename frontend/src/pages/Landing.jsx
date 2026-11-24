import Logo from "../components/Logo";
import { ArrowRight } from "reicon-react";
import { GiCheckMark } from "react-icons/gi";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  let featuresArr = [
    "Track Expenses",
    "Monitor Income",
    "Manage Budget",
    "Spending Insights",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Logo />
      <div className="max-w-md sm:max-w-lg w-full bg-[#F5F5F5] space-y-6 rounded-xl border border-slate-100 p-4 sm:p-7">
        <div className="text-center space-y-2 sm:space-y-4">
          <p className="uppercase text-emerald-600 font-extrabold text-center text-xs sm:text-base">
            your money, your control
          </p>

          <p className="text-slate-900 tracking-tight font-bold text-2xl sm:text-3xl">
            Manage your money with confidence.
          </p>

          <p className="text-slate-600 leading-relaxed text-xs sm:text-base">
            ExpenseTracker helps you track expenses, monitor income, manage
            budgets and understand your spending — all in one simple place.
          </p>
        </div>

        <div className="pt-2 space-y-2.5 sm:flex sm:items-center sm:justify-start sm:flex-wrap gap-4">
          {featuresArr.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 text-slate-700"
            >
              <GiCheckMark className="text-slate-950 text-sm sm:text-md" />
              <span className="font-medium text-sm sm:text-md">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center bg-slate-950 text-white font-bold py-2 sm:py-2.5 text-sm sm:text-lg rounded-xl w-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#e2e2e2] hover:text-black "
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center pt-2 gap-2 font-bold text-slate-500 text-xs">
          <span>Simple</span>
          <RxDotFilled />
          <span>Organized</span>
          <RxDotFilled />
          <span>Smarter</span>
        </div>
      </div>
    </div>
  );
}

export default Landing;

import moneyBag from "../assets/moneyBag.svg";
import { Home6 } from "reicon-react";
import { Arrow2 } from "reicon-react";
import { WalletMoney } from "reicon-react";
import { NavLink } from "react-router-dom";
import { Logout4 } from "reicon-react";
import { User4 } from "reicon-react";
import { ChartTrend } from "reicon-react";
import { logoutUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import TransactionForm from "./Transactions/TransactionForm";

function Sidebar({ onTransactionChange }) {
  const { setUser } = useContext(AuthContext);
  async function logout() {
    try {
      let res = await logoutUser();
      setUser(null);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Logout");
    }
  }
  return (
    <>
      <div className="p-3 bg-[#e2e2e2] fixed bottom-0 md:left-0  w-full md:w-20 md:h-screen z-10">
        <div className=" bg-[#F5F5F5] p-3 rounded-xl h-full md:w-20 md:flex md:flex-col md:justify-between md:items-center">
          <div className="flex flex-row md:flex-col justify-between items-center  md:gap-6">
            <div className="hidden md:block mb-4">
              <img src={moneyBag} alt="Money Bag Svg" className="w-14 h-14" />
            </div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277] ${isActive ? "bg-[#78d277]" : ""}`
              }
            >
              <Home6 />
            </NavLink>

            <NavLink
              to="/all-transactions"
              className={({ isActive }) =>
                `p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277] ${isActive ? "bg-[#78d277]" : ""}`
              }
            >
              <Arrow2 />
            </NavLink>

            <TransactionForm
              mode="add"
              onTransactionChange={onTransactionChange}
              className="p-2 md:p-3  rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277]"
            />

            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277] ${isActive ? "bg-[#78d277]" : ""}`
              }
            >
              <WalletMoney />
            </NavLink>

            <NavLink
              to="/reports"
              title="Reports"
              className={({ isActive }) =>
                `p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277] ${isActive ? "bg-[#78d277]" : ""}`
              }
            >
              <ChartTrend />
            </NavLink>

            <NavLink
              to="profile"
              className={({ isActive }) =>
                `p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277] ${isActive ? "bg-[#78d277]" : ""}`
              }
            >
              <User4 />
            </NavLink>
          </div>

          <button
            onClick={logout}
            className="pb-2 p-3  hidden md:block hover:bg-red-400 rounded-xl cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Logout4 />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

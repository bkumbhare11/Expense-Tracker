import PageHeader from "@/components/PageHeader";
import { User4 } from "reicon-react";
import { Envelope } from "reicon-react";
import { Lock } from "reicon-react";
import { Logout4 } from "reicon-react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { logoutUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "@/components/DeleteAccount";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <PageHeader title="Profile" subtitle="Manage Your Account" />

      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#F5F5F5] border border-slate-100 rounded-xl p-5 w-full max-w-lg">
          <h2 className="font-bold text-lg">Personal Information</h2>

          <div className="flex flex-col gap-2 mt-4">
            <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200/60 ">
              <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 mb-1">
                <User4 size={18} />
                <span>Full Name</span>
              </div>
              <p className="font-semibold text-sm md:text-base">
                {user && user.name}
              </p>
            </div>

            <div className="bg-white/60 p-3.5 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 mb-1">
                <Envelope size={18} />
                <span>Email Address</span>
              </div>
              <p className="font-semibold text-sm md:text-base ">
                {user && user.email}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <h2 className="font-bold text-lg">Account</h2>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => navigate("/change-password")}
                className="w-full flex items-center justify-between p-3 bg-white/60 hover:bg-white border border-slate-200/60 rounded-xl text-slate-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Lock size={18} className="text-slate-500" />
                  <span>Change Password</span>
                </div>
                <span className="text-slate-400 text-xs">→</span>
              </button>

              <button
                onClick={logout}
                className="w-full flex items-center justify-between p-3 bg-rose-50/80 hover:bg-rose-100/80 border border-rose-200/60 rounded-xl text-rose-600 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Logout4 size={18} />
                  <span>Logout</span>
                </div>
                <span className="text-xs">→</span>
              </button>

              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

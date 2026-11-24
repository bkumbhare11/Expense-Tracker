import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import BudgetForm from "./components/budget/BudgetForm";
import Profile from "./pages/Profile";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Report from "./components/analysis/Report";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/budget-form" element={<BudgetForm />} />
            <Route path="/budget-form/:id" element={<BudgetForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

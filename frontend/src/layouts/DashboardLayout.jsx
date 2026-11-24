import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <Sidebar onTransactionChange={() => setRefresh((prev) => !prev)} />

      <main className="min-h-screen overflow-y-scroll pb-24 md:pb-5 md:ml-24 px-6 py-4 space-y-6 ">
        <Outlet context={{ refresh, setRefresh }} />
      </main>
    </div>
  );
}

export default DashboardLayout;

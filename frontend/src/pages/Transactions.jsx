import PageHeader from "../components/PageHeader";
import SearchBar from "../components/Transactions/SearchBar";
import AllTransactions from "@/components/Transactions/AllTransactions";
import { useState } from "react";

function Transactions() {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    startDate: "",
    endDate: "",
    sort: "latest",
    page: 1,
    limit: 10,
  });
  return (
    <>
      <PageHeader title="Transactions" subtitle="Manage your transactions" />
      <SearchBar filters={filters} setFilters={setFilters} />
      <AllTransactions filters={filters} setFilters={setFilters} />
    </>
  );
}

export default Transactions;

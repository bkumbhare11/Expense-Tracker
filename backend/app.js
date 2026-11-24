import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import fixedExpensesRoutes from "./routes/fixedExpensesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportsRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/transactions/", transactionRoutes);
app.use("/api/budget/", budgetRoutes);
app.use("/api/budget/fixed-expenses/", fixedExpensesRoutes);
app.use("/api/dashboard/", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorMiddleware);

export default app;

import User from "../model/User.js";
import Transaction from "../model/Transaction.js";
import Budget from "../model/Budget.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    const isUserExists = await User.exists({ email });

    if (isUserExists) {
      const error = new Error("User with email already exists");
      error.statusCode = 409;
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: userData,
    });
  } catch (error) {
    const serverError = new Error(`Failed to create user : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      return next(error);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      return next(error);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    let userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: userData,
    });
  } catch (error) {
    const serverError = new Error(`Failed to login : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const profile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    let user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      return next(error);
    }

    let userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Profile Got",
      data: userData,
    });
  } catch (error) {
    const serverError = new Error(`Error fetching profile : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });

    const { oldPassword, newPassword } = req.body;

    let isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isCorrectPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      return next(error);
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    const serverError = new Error(`Error changing password : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      return next(error);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetTokenExpiry = Date.now() * 15 * 60 * 1000;

    await sendEmail(user.email, resetToken);

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a reset link will be sent.",
    });
  } catch (error) {
    const serverError = new Error(`Error : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    let user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: {
        $gte: Date.now(),
      },
    });

    if (!user) {
      const error = new Error("Invalid or Expired Token");
      error.statusCode = 404;
      return next(error);
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    const serverError = new Error(
      `Error resetting password : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    let userId = req.user.userId;

    await Transaction.deleteMany({ user: userId });
    await Budget.deleteMany({ user: userId });
    await User.findByIdAndDelete({ _id: userId });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    const serverError = new Error(`Error deleting account : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    const serverError = new Error(`Failed to logout : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

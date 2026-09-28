import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

export async function registerController(req, res) {
  const { email, name, password, confirmPassword } = req.body;

  const isAlreadyExist = await userModel.findOne({
    email,
  });

  if (isAlreadyExist) {
    return res.status(400).json({
      message: "User already exist with this email address",
      errors: {
        path: "email",
        msg: "User already exist with this email address",
      },
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
    // confirmPasswordHash: await bcrypt.hash(confirmPassword, 12)
  });

  const accessToken = createAccessToken({
    userId: user._id,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({ userId: user._id });

  const refreshToken = createRefreshToken({ userId: user._id });

  await userModel.findOneAndUpdate({ email }, { refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User loggedIn successfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
}

export async function refreshController(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);

    const { userId } = decoded;

    const user = await userModel.findById(userId);

    if (refreshToken != user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, { refreshToken: null });

      return res.status(401).json({
        message: "Refresh token mismatch",
      });
    }

    const accessToken = createAccessToken({ userId });

    const newRefreshToken = createRefreshToken({ userId });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Tokens roteted successfully.",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
}

export async function getMeController(req, res) {
  const { userId } = req.user;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User data fetch successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    },
  });
}

export async function logoutController(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    try {
      const decoded = readRefreshToken(refreshToken);

      const { userId } = decoded;

      await userModel.findByIdAndUpdate(userId, {
        refreshToken: null,
      });
    } catch (error) {
      console.log("cookie is invalid/expire", error);
    }
  }

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "User logged out successfully",
  });
}

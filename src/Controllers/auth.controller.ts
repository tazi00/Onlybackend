import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Utilities/tokenHandlers";
import {
  createUser,
  getUser,
  getUserByEmail,
  getUserByUsername,
} from "../services/user.service";
import { REFRESH_TOKEN } from "../Constants/tokens";

async function login(req: any, res: Response) {
  try {
    const { userId } = req;
    const user = await getUser(userId);
    if (typeof user === "string") {
      // Handle the case where user is a string (error message)
      return res.status(404).json({
        status: "error",
        data: null,
        message: user,
      });
    }
    // Now you can use email, username, and password to generate tokens
    const { email, username, password } = user;
    const accessToken = generateAccessToken(email, password, username);
    const refreshToken = generateRefreshToken(email, password, username);

    res.json({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
      message: "Login successful",
    });
  } catch (error: any) {
    console.error(`Token generation error: ${error.message}`);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Token generation failed",
    });
  }
}

async function register(req: Request, res: Response) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    // Check if a user with the same username already exists
    const existingUserWithUsername = await getUserByUsername(username);
    if (existingUserWithUsername) {
      return res
        .status(400)
        .json({ msg: "User with this username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await createUser(username, email, hashedPassword);

    res.json({
      status: "success",
      data: {
        user: newUser,
      },
      message: "Registration successful",
    });
  } catch (error: any) {
    if (error.code === "SOME_SPECIFIC_ERROR_CODE") {
      return res.status(400).json({ msg: "Some specific validation error" });
    } else {
      console.error(`Registration error: ${error.message}`);
      return res.status(500).json({
        status: "error",
        data: null,
        message: "Registration failed",
      });
    }
  }
}

function logout(req: Request, res: Response) {
  res.json({ msg: "logout route" });
}

export async function refreshAccessToken(req: Request, res: Response) {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ msg: "Refresh token is missing" });
    }
    jwt.verify(refreshToken, REFRESH_TOKEN, async (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ msg: "Invalid refresh token" });
      }
      try {
        const userData = await getUserByEmail(user.email);
        if (!userData) {
          return res.status(404).json({ msg: "User not found" });
        }
        const newAccessToken = generateAccessToken(
          userData.email,
          userData.password,
          userData.username
        );
        res.json({
          status: "success",
          data: {
            accessToken: newAccessToken,
          },
          message: "Access token refreshed successfully",
        });
      } catch (error: any) {
        console.error(`Error getting user details: ${error.message}`);
        res.status(500).json({
          status: "error",
          data: null,
          message: "Failed to refresh access token",
        });
      }
    });
  } catch (error: any) {
    console.error(`Error refreshing access token: ${error.message}`);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to refresh access token",
    });
  }
}

export { login, logout, register };

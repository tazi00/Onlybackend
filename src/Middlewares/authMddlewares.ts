import { Request, Response, NextFunction } from "express";
import { getUserByEmail, getUserByUsername } from "../services/user.service";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN } from "../Constants/tokens";
import jwt from "jsonwebtoken";

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({
      status: "error",
      msg: "Email or Username and password are required",
    });
  }

  if (password.length < 6 || password.length > 10) {
    return res.status(400).json({
      status: "error",
      msg: "Password must be between 6 and 10 characters",
    });
  }

  next();
}

export function validateRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  next();
}

export const authenticateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailOrUsername, password } = req.body;
    const userByEmail = await getUserByEmail(emailOrUsername);
    const userByUsername = await getUserByUsername(emailOrUsername);

    let isValidCredentials = false;

    if (userByEmail) {
      isValidCredentials = await bcrypt.compare(password, userByEmail.password);
      console.log("email", userByEmail);
    } else if (userByUsername) {
      isValidCredentials = await bcrypt.compare(
        password,
        userByUsername.password
      );
    }

    if (isValidCredentials) {
      req.userId = userByEmail ? userByEmail.id : userByUsername.id;
      next();
    } else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error: any) {
    console.error(`Authentication error: ${error.message}`);
    res.status(500).json({ msg: "Authentication failed" });
  }
};

export const authenticateToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "Access token is missing" });
  }

  jwt.verify(token, ACCESS_TOKEN, async (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid access token" });
    }

    try {
      const userDetails = await getUserByUsername(user.username);

      if (!userDetails) {
        return res.status(404).json({ msg: "User not found" });
      }
      console.log(userDetails);

      // Attach user details to the request object
      req.user = userDetails;
      next();
    } catch (error: any) {
      console.error(`Error getting user details: ${error.message}`);
      res.status(500).json({ msg: "Failed to retrieve user details" });
    }
  });
};

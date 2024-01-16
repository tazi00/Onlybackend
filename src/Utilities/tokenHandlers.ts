import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants/tokens";
import jwt from "jsonwebtoken";

export function generateAccessToken(
  email: string,
  password: string,
  username: string
): string {
  return jwt.sign({ email, password, username }, ACCESS_TOKEN, {
    expiresIn: "1m",
  });
}

export function generateRefreshToken(
  email: string,
  password: string,
  username: string
): string {
  return jwt.sign({ email, password, username }, REFRESH_TOKEN, {
    expiresIn: "2d",
  });
}

export function verifyAccessToken(token: string): string | object {
  try {
    return jwt.verify(token, ACCESS_TOKEN);
  } catch (error) {
    throw new Error("Invalid access token");
  }
}
export function verifyRefreshToken(token: string): string | object {
  try {
    return jwt.verify(token, REFRESH_TOKEN);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

import { Request, Response } from "express";
import { getUsers } from "../services/user.service";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await getUsers();

    res.json({
      status: "success",
      data: {
        users: allUsers,
      },
      message: "All users retrieved successfully",
    });
  } catch (error: any) {
    console.error(`Error getting all users: ${error.message}`);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to retrieve all users",
    });
  }
}

export async function getUserInfo(req: any, res: Response) {
  try {
    const user = req.user;

    res.json({
      status: "success",
      data: user,
      message: "User details retrieved successfully",
    });
  } catch (error: any) {
    console.error(`Error getting user details: ${error.message}`);
    res.status(500).json({ msg: "Failed to retrieve user details" });
  }
}
export function createUser(req: Request, res: Response) {
  res.json({ msg: "create user" });
}
export function updateUser(req: Request, res: Response) {
  res.json({ msg: "update user" });
}
export function deleteUser(req: Request, res: Response) {
  res.json({ msg: "delete user" });
}

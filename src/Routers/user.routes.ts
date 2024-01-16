import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  updateUser,
} from "../Controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/all").get(getAllUsers);
userRouter
  .route("/")
  .get(getUserInfo)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;

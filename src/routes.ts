import { Router } from "express";
import { createGroup, listGroup, createUser, loginUser } from "./controllers";
import { checkPermission } from "./middlewares";

const userRouter: Router = Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);

const userGroupRouter: Router = Router();

userGroupRouter.post(
  "/create",
  checkPermission("userGroup", "create"),
  createGroup
);
userGroupRouter.get("/list", checkPermission("userGroup", "read"), listGroup);

export { userRouter, userGroupRouter };

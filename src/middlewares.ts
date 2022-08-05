import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { LeanDocument } from "mongoose";
import { User, UserGroup, IPermission, IUserGroup } from "./models";

type Next = () => void | Promise<void>;

interface Payload extends JwtPayload {
  userId: String;
}

const checkAuthorization = (req: Request, res: Response, next: Next) => {
  const token: string = req.headers?.authorization || "";

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secret",
    function async(err, decoded) {
      const { userId } = (decoded as Payload) || "";
      res.locals.userId = userId;

      if (err) {
        res.status(401).send({
          message: "Invalid credential",
        });
        return;
      }

      next();
    }
  );
};
const checkPermission = (module: String, action: String) => {
  return async (req: Request, res: Response, next: Next) => {
    const user = await User.findById(res.locals.userId)
      .populate("groups")
      .populate("groups.permissions");

    const userGroups = user?.groups;
    var permitted = false;
    userGroups?.forEach((userGroup) => {
      userGroup?.permissions.forEach(async (permission: IPermission) => {
        console.log(permission.module, permission.action);

        if (module === permission.module && action === permission.action) {
          permitted = true;
          return;
        }
      });
    });

    if (!permitted)
      return res.status(403).send({
        message: "Permission denied",
      });
    next();
  };
};

export { checkAuthorization, checkPermission };

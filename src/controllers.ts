import { Request, Response } from "express";
import { User, UserGroup } from "./models";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).send({
    message: "Created user",
    data: {
      user: user,
    },
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }).lean();
  console.log(user);
  if (user) {
    const token: string = jwt.sign(
      {
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "24h",
      }
    );
    console.log(token);
    res.status(200).send({
      message: "Logged in",
      data: { token },
    });
    return;
  }
  res.status(401).send({
    message: "Invalid login",
  });
};

const createGroup = async (req: Request, res: Response) => {
  const group = await UserGroup.create(req.body);

  res.status(201).send({
    message: "Created user group",
    data: {
      userGroup: group,
    },
  });
};

const listGroup = async (req: Request, res: Response) => {
  const groups = await UserGroup.find();
  res.status(200).send({
    data: {
      userGroups: groups,
    },
  });
};

export { createGroup, listGroup, createUser, loginUser };

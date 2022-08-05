import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  password?: string;
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  password: String,
});

const User = model<IUser>("user", userSchema);

enum Action {
  read = "read",
  create = "create",
  update = "update",
  delete = "delete",
}
interface IPermission {
  model: string;
  action: Action;
}
interface IUserGroup {
  title: String;
  permissions: [IPermission];
}

import { Schema, model } from "mongoose";

interface IUser {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  groups: [Schema.Types.ObjectId];
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  password: String,
  groups: { type: [Schema.Types.ObjectId], default: [], ref: "usergroup" },
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

const permissionSchema = new Schema<IPermission>({
  model: { type: String, required: true },
  action: { type: String, required: true },
});

const userGroupSchema = new Schema<IUserGroup>({
  title: { type: String, required: true },
  permissions: {
    type: [permissionSchema],
    default: [],
  },
});

const UserGroup = model<IUserGroup>("usergroup", userGroupSchema);

export { User, UserGroup };

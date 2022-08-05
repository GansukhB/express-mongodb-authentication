import { Schema, PopulatedDoc, Document, model } from "mongoose";

interface IUser {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  groups?: [PopulatedDoc<Document & IUserGroup>];
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  password: String,
  groups: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "usergroup",
  },
});

const User = model<IUser>("user", userSchema);

enum Action {
  read = "read",
  create = "create",
  update = "update",
  delete = "delete",
}
interface IPermission {
  _id?: string;
  module: string;
  action: Action;
}

const permissionSchema = new Schema<IPermission>({
  module: { type: String, required: true },
  action: { type: String, required: true },
});

interface IUserGroup {
  _id?: string;
  title: String;
  permissions?: [PopulatedDoc<IPermission & Document>];
}

const userGroupSchema = new Schema<IUserGroup>({
  title: { type: String, required: true },
  permissions: {
    type: [permissionSchema],
    default: [],
  },
});

const UserGroup = model<IUserGroup>("usergroup", userGroupSchema);

export { IPermission, IUserGroup, User, UserGroup };

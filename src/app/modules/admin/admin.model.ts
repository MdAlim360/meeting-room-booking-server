import { model } from "mongoose";
import { TUser } from "../user/user.interface";
import { userSchema } from "../user/user.model";

export const Admin = model<TUser>('Admin', userSchema);
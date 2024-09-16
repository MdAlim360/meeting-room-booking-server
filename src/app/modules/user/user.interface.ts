import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'user' | 'admin'
    _id?: string
}

//* creating type for mongoose static method//
export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Admin } from "../admin/admin.model";

export const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }

},
    {
        timestamps: true
    })

//* pre save mongoose document middleware/hook: work on create(), save()//
userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook:we will save data');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;//*this can stored whole current doc data//
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next();

})

//* post save mongoose document middleware/hook: work on create(), save()//
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    const user = await User.findOne({ email }).select('+password');
    const admin = await Admin.findOne({ email }).select('+password');
    if (user) {
        return user;
    }
    else {
        return admin;
    }
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};



export const User = model<TUser, UserModel>('User', userSchema)


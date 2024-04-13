import mongoose, {Schema, Document} from "mongoose";
import { Message, messageSchema } from "./Message.model";


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true,
    },
    messages: [messageSchema]
})

const UserModel = mongoose.models.users as mongoose.Model<User> || mongoose.model<User>("users", userSchema)

export default UserModel
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

import { sendMail } from "@/helpers/sendMail";

export async function POST(request: Request) {
    // connect to db
    await dbConnect();

    try {

        const { email } = await request.json();

        const existingUserByEmail = await UserModel.findOne
        ({
            email,
        });

        let username = existingUserByEmail?.username
        
        if(existingUserByEmail) {
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            // send reset code to email
            const emailResponse = await sendMail(
                email,
                username? username : "user",
                verifyCode
            );

            if(!emailResponse.success) {
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.message,
                    },
                    {
                        status: 500,
                    }
                );
            }

            // update user with verify code
            existingUserByEmail.verifyCode = verifyCode;
            await existingUserByEmail.save();

            return Response.json(
                {
                    username: username,
                    success: true,
                    message: "Password reset code sent to email",
                },
                {
                    status: 201,
                }
            );
        }
    } catch (error) {
        console.error("Error in forget password", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}
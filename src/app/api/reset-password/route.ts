import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    // connect to db
    await dbConnect();

    try {
        const { username, verifyCode, newPassword } = await request.json();

        const existingUser = await UserModel.findOne({
            username,
        });

        if (!existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        if (existingUser.verifyCode !== verifyCode) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid verification code",
                },
                {
                    status: 400,
                }
            );
        }

        // Hash the new password

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password

        existingUser.password = hashedPassword;
        await existingUser.save();

        return Response.json(
            {
                success: true,
                message: "Password reset successfully",
            },
            {
                status: 200,
            }
        );
        
    } catch (error) {
        console.error("Error in reset password", error);
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
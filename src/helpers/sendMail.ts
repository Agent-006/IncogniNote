import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendMail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "IncogniNote | Verification code",
            html: `<h1>Hi ${username},</h1>
            <p>Your verification code is: <strong>${verifyCode}</strong></p>
            <p>Use this code to verify your email address.</p>
            `,
        }

        const mailResponse = await transport.sendMail(mailOptions);
        
        if (mailResponse) {
            return {
                success: true,
                message: "Verification email send successfully",
            }
        } else {
            return {
                success: false,
                message: "Failed to send verification email",
            }
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {success: false, message: "Failed to send verification email"}
    }
}
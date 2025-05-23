"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";

const ResetPassword = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            verifyCode: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/reset-password`, {
                username: params.username,
                verifyCode: data.verifyCode,
                newPassword: data.newPassword,
            });

            if (
                !response.data.success &&
                response.data.message === "Invalid verification code"
            ) {
                toast({
                    title: "Invalid Verification Code",
                    description: response.data.message,
                    variant: "destructive",
                });
            }

            toast({
                title: "Success",
                description: response.data.message,
            });

            if (response.data.success) {
                router.push("/sign-in");
            }
        } catch (error) {
            console.error("Error in resetting password", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "Reset Password Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background/30 to-primary/0">
            <div className="w-full max-w-md p-8 space-y-8 bg-background/95 backdrop-blur rounded-lg border border-primary/10 shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-foreground mb-2">
                        Reset Password
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your verification code and new password
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="verifyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter verification code"
                                            {...field}
                                            className="bg-background"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            {...field}
                                            className="bg-background"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
                                            {...field}
                                            className="bg-background"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;

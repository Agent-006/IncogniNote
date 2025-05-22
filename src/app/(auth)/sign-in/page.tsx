"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            // toast({
            //   title: "Login Failed",
            //   description: "Incorrect username or password",
            //   variant: "destructive",
            // });

            //FIXME: This is totally optional
            if (result?.error === "CredentialsSignin") {
                toast({
                    title: "Login Failed",
                    description: "Incorrect username or password",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                });
            }
        }

        setIsSubmitting(false);

        if (result?.url) {
            router.replace("/dashboard");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background/30 to-primary/0 dark:from-primary/10 dark:via-background/20 dark:to-primary/0 overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="0.5"
                                opacity="0.07"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <div className="relative z-10 w-full max-w-lg">
                <div className="bg-background/90 border border-primary/10 rounded-2xl shadow-2xl px-0 py-0 overflow-hidden">
                    {/* Left grid accent */}
                    <div className="hidden md:block absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-l-2xl" />
                    {/* Right grid accent */}
                    <div className="hidden md:block absolute right-0 top-0 h-full w-2 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent rounded-r-2xl" />
                    <div className="relative flex flex-col md:flex-row">
                        {/* Decorative grid column */}
                        <div className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gradient-to-br from-primary/10 via-background/0 to-primary/0 p-8">
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 80 80"
                                fill="none"
                            >
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="#6366f1"
                                    strokeWidth="3"
                                    opacity="0.15"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="28"
                                    stroke="#6366f1"
                                    strokeWidth="2"
                                    opacity="0.10"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="20"
                                    stroke="#6366f1"
                                    strokeWidth="1.5"
                                    opacity="0.08"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="12"
                                    stroke="#6366f1"
                                    strokeWidth="1"
                                    opacity="0.06"
                                />
                            </svg>
                            <span className="mt-6 text-lg font-semibold text-primary text-center">
                                IncogniNote
                            </span>
                            <span className="mt-2 text-xs text-muted-foreground text-center">
                                Anonymous. Honest. Safe.
                            </span>
                        </div>
                        {/* Form section */}
                        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
                            <div className="flex flex-col items-center mb-8">
                                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/10 shadow">
                                    <svg
                                        width="32"
                                        height="32"
                                        fill="none"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle
                                            cx="16"
                                            cy="16"
                                            r="14"
                                            stroke="currentColor"
                                            className="text-primary"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M10 16h12M16 10v12"
                                            stroke="currentColor"
                                            className="text-primary"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-base text-muted-foreground">
                                    Sign in to{" "}
                                    <span className="font-semibold text-primary">
                                        IncogniNote
                                    </span>
                                </p>
                            </div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="w-full space-y-5"
                                >
                                    <FormField
                                        name="identifier"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-foreground">
                                                    Email or Username
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your email or username"
                                                        autoComplete="username"
                                                        className="rounded-md border-primary/20 focus:border-primary focus:ring-primary/30 bg-background"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="password"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-foreground">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        autoComplete="current-password"
                                                        className="rounded-md border-primary/20 focus:border-primary focus:ring-primary/30 bg-background"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-muted-foreground">
                                                    Your credentials are private
                                                    and secure.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2 rounded-md font-semibold bg-primary text-white shadow hover:bg-primary/90 transition"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                Please wait
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                            <div className="w-full flex flex-col items-center mt-7">
                                <div className="w-full flex items-center gap-2 mb-2">
                                    <div className="flex-1 h-px bg-primary/10" />
                                    <span className="text-xs text-muted-foreground">
                                        or
                                    </span>
                                    <div className="flex-1 h-px bg-primary/10" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Not a member?{" "}
                                    <Link
                                        href="/sign-up"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

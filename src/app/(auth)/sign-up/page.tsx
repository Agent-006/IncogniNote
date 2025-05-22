"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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

export default function SignUpPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: response.data?.success ? "Success" : "Failed",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in signup", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <div className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gradient-to-br from-primary/10 via-background/0 to-primary/0 p-6">
              <svg
                width="60"
                height="60"
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
              <span className="mt-4 text-lg font-semibold text-primary text-center">
                IncogniNote
              </span>
              <span className="mt-1 text-xs text-muted-foreground text-center">
                Anonymous. Honest. Safe.
              </span>
            </div>
            {/* Form section */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              <div className="flex flex-col items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/10 shadow">
                  <svg
                    width="24"
                    height="24"
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
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-3 mb-1">
                  Join IncogniNote
                </h1>
                <p className="text-sm text-muted-foreground">
                  Start your anonymous adventure
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Choose a username"
                            className="rounded-md border-primary/20 focus:border-primary focus:ring-primary/30 bg-background"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounced(e.target.value);
                            }}
                          />
                        </FormControl>
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        <p
                          className={`text-sm ${
                            usernameMessage === "Username is available"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                        <FormDescription className="text-xs text-muted-foreground">
                          This will be your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
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
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="rounded-md border-primary/20 focus:border-primary focus:ring-primary/30 bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground">
                          Your credentials are private and secure.
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="w-full flex flex-col items-center mt-4">
                <div className="w-full flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px bg-primary/10" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-primary/10" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Already a member?{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign In
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

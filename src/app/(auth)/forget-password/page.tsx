"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { forgetPasswordSchema } from "@/schemas/forgetPasswordSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";

const ForgetPassword = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/forget-password`, {
        email: data.email,
      });
      
      toast({
        title: "Success",
        description: response.data.message,
      });

      router.push(`/reset-password/${response?.data?.username}`);
    } catch (error) {
      console.error("Error in forget password", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Forget Password Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden border-t border-primary/10 shadow-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-background/30 to-primary/0 dark:from-primary/10 dark:via-background/20 dark:to-primary/0">
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-background/95 backdrop-blur rounded-lg border border-primary/10 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Reset Your Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                      className="rounded-md border-primary/20 focus:border-primary focus:ring-primary/30 bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 rounded-md font-semibold bg-primary text-white shadow hover:bg-primary/90 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reset Code
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

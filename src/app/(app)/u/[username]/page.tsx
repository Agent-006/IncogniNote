"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import { z } from "zod";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||What's your genre?||What's your hobby?";

function PublicPage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-10">
      {/* Main Card */}
      <div className="bg-gradient-to-br from-primary/10 via-background/80 to-primary/5 border border-primary/20 shadow-2xl rounded-3xl p-6 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm tracking-tight">
            Message @{username}
          </h1>
          <p className="text-muted-foreground mt-2">
            Send an anonymous message to this user
          </p>
        </div>

        {/* Message Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-foreground">
                    Your Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here..."
                      className="resize-none min-h-[120px] bg-background/80 border-primary/20 focus:border-primary/40 transition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="min-w-[120px]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading || !messageContent}
                  className="min-w-[120px] bg-primary hover:bg-primary/90"
                >
                  Send Message
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* Suggested Messages */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Suggested Messages
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {parseStringMessages(initialMessageString).map((message, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleMessageClick(message)}
                className="h-auto py-4 px-5 text-center justify-center bg-background/50 hover:bg-primary/5 hover:text-primary border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-200 w-full"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
                {message}
              </Button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Want Your Own Message Board?
            </h3>
            <p className="text-muted-foreground mb-6">
              Create an account and start receiving anonymous messages
            </p>
            <Link href="/sign-up">
              <Button className="bg-primary hover:bg-primary/90">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPage;

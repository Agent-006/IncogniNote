"use client";

import MessageCard from "@/components/MessageCard/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/Message.model";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const DashboardPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  // handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-lg text-muted-foreground">
        Please login
      </div>
    );
  }

  const { username } = session?.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL copied!",
      description: "Profile URL has been copied to your clipboard",
    });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-6 py-8 mt-10">
      {/* Dashboard Card */}
      <div className="bg-gradient-to-br from-primary/10 via-background/80 to-primary/5 border border-primary/20 shadow-2xl rounded-3xl p-6 md:p-12 flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Welcome back, <span className="font-semibold text-foreground">{username}</span>!
            </p>
          </div>
          <div className="flex items-center gap-3 bg-muted/60 rounded-xl px-4 py-2 shadow-inner">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
            <span className="ml-2 text-sm font-medium text-foreground">
              Accept Messages:{" "}
              <span
                className={
                  acceptMessages
                    ? "text-primary font-semibold"
                    : "text-muted-foreground font-semibold"
                }
              >
                {acceptMessages ? "On" : "Off"}
              </span>
            </span>
          </div>
        </header>

        {/* Profile Link */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-foreground">
            Your Unique Link
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              readOnly
              className="w-full rounded-lg border border-primary/20 bg-background/80 text-foreground px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
            <Button
              onClick={copyToClipboard}
              variant="secondary"
              className="flex-shrink-0 flex items-center gap-1"
              type="button"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </section>

        <Separator />

        {/* Messages Section */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            Messages
          </h2>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </section>

        {/* Messages Grid */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-lg">
                No messages to display.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

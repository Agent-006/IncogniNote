"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/Message.model";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id);
  };

  // New design: glassmorphism, colored accent bar, floating delete, subtle shadow, and message icon
  return (
    <Card
      className="
        relative overflow-hidden
        bg-white/70 dark:bg-background/70
        backdrop-blur-md
        border-0 shadow-lg
        rounded-3xl
        flex flex-col justify-between
        min-h-[200px]
        transition
        hover:scale-[1.025] hover:shadow-2xl
        p-0
      "
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(80, 80, 180, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-primary to-secondary rounded-l-3xl" />
      {/* Floating delete button */}
      <div className="absolute top-4 right-4 z-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-destructive/20 text-destructive shadow-md"
              aria-label="Delete message"
            >
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                this message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardHeader className="p-6 pb-2 flex-1">
        <div className="flex items-center gap-3">
          {/* Message icon */}
          <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground break-words max-w-[90%]">
            {message.content}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-5 pt-0">
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
          </span>
          {/* Optionally, add a subtle status dot or badge */}
          <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
        </div>
      </CardContent>
    </Card>
  );
}

export default MessageCard;

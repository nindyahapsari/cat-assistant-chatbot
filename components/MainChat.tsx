"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Chatassistant from "./ChatAssistant";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "@/types";

export default function MainChat() {
  const [chatInput, setChatInput] = useState<string>("");
  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      return response.body;
    },
  });

  const handleSendMessage = async () => {
    const userInput = {
      id: nanoid(),
      isUserMessage: true,
      text: chatInput,
    };

    sendMessage(userInput);
    setChatInput("");
  };

  return (
    <div className="py-4 px-4 h-auto desktop:col-start-4 desktop:col-span-12 desktop:row-span-12">
      <div className="h-full p-4 flex flex-col justify-between">
        <div className="h-5/6 mb-4">
          <Chatassistant />
        </div>
        <div className="px-4 flex w-full items-center space-x-2">
          <Textarea
            className="max-h-64"
            placeholder="Type your message here."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            disabled={isPending}
            type="submit"
            onClick={handleSendMessage}
          >
            {isPending ? (
              <Loader2 className="h-4 w-8 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

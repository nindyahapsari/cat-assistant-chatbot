"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "@/types";
import { MessagesContext } from "@/context/messages";
import ChatMessages from "./ChatMessages";

export default function MainChat() {
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const [chatInput, setChatInput] = useState<string>("");
  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (_message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream response");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const decodedChunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + decodedChunkValue);
      }

      setIsMessageUpdating(false);
      setChatInput("");
    },
    onError: (_, message) => {
      // should show toast here
      removeMessage(message.id);
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
    <div className="py-4 px-4 overflow-hidden desktop:col-start-4 desktop:col-span-12 desktop:row-span-12">
      <div className="h-full p-4 flex flex-col justify-between">
        <ChatMessages />

        <div className="px-4 flex w-full items-center space-x-2">
          <Textarea
            className="max-h-64 desktop:text-xl"
            placeholder="Type your message here."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !chatInput.match(/\n/) &&
                chatInput !== ""
              ) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            disabled={isPending || !chatInput}
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

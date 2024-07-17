import { useContext } from "react";
import ChatBubble from "./ChatBubble";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ChatMessages() {
  const { messages } = useContext(MessagesContext);

  return (
    <div className="h-5/6 mb-4 px-4 overflow-y-scroll">
      {messages.map(({ id, isUserMessage, text }) => {
        return (
          <div
            key={id}
            className={cn("flex", {
              "justify-end": isUserMessage,
            })}
          >
            <ChatBubble isUserMessage={isUserMessage} text={text} />
          </div>
        );
      })}
    </div>
  );
}

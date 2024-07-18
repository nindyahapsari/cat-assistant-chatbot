import { useContext } from "react";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";

import ChatBubble from "./ChatBubble";

export default function ChatMessages() {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div className="h-5/6 mb-8 px-4 flex flex-col-reverse gap-3 overflow-y-scroll">
      {inverseMessages.map(({ id, isUserMessage, text }) => {
        return (
          <div
            key={id}
            className={cn("flex justify-start items-end", {
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

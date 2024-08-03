import { useContext } from "react";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";

import ChatBubble from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatMessages() {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div className="overflow-y-auto h-5/6 mb-8 px-4 flex flex-col-reverse tablet:max-w-[70vw] gap-3">
     {inverseMessages.map(({ id, isUserMessage, text }) => {
        return (
          <div
          key={id}
          className={cn("flex justify-start items-center gap-2", {
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

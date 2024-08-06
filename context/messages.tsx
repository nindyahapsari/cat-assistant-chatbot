import { Message } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const WHISKER_CHAT_STARTER = `
Greetings cat member, I'm Whisker, your personal cat assistant. How can I help you today?

You can ask me questions about:
- Your cat's health and well-being
- Feeding schedules and dietary advice
- Activities and playtime ideas
- Grooming tips and schedules

For the best responses, please ask specific questions. For example:
- "What should I feed my cat for dinner?"
- "How often should I groom my cat?"

I'm here to assist you with all your cat-related queries!
`;

const defaultValue = [
  {
    id: uuidv4(),
    text: WHISKER_CHAT_STARTER,
    isUserMessage: false,
  },
];

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  const contextValues = {
    messages,
    addMessage,
    isMessageUpdating,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  };

  return (
    <MessagesContext.Provider value={contextValues}>
      {children}
    </MessagesContext.Provider>
  );
};

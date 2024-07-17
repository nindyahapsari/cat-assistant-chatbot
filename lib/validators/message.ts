import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().min(1).max(100),
  isUserMessage: z.boolean(),
  text: z.string().min(1).max(1000),
});

export const MessageArraySchema = z.array(MessageSchema);

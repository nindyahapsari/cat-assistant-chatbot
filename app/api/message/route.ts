import { MessageArraySchema } from "@/lib/validators/message";
import { chatbotPrompt } from "@/helpers/chatbotPrompt";
import {
  OpenAIStreamPayload,
  ChatGPTMessage,
  OpenAIStream,
} from "@/lib/openai-stream";

export async function POST(req: Request) {
  // post message to API
  // the data will be transfer with stream

  // extract the data from the request
  const { messages } = await req.json();

  // validate the data because it's from the client and we want to make sure its the correct type
  // validate in an array since we are going to sent into chunks
  const parsedMessages = MessageArraySchema.parse(messages);

  // use unshift to put the outboundmessage into the front of the array
  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });


  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-4o-mini",
    messages: outboundMessages,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.4,
    max_tokens: 300,
    stream: true,
    n: 1,
  };

  // send to openai API and return the stream response
  const stream = await OpenAIStream(payload);

  // new Response is in docs of https://developer.mozilla.org/en-US/docs/Web/API/Response
  return new Response(stream);
}

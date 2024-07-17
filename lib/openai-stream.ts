// import
import {
  createParser,
  ParseEvent,
  ReconnectInterval,
} from "eventsource-parser";

//type for chatGPTAgent
export type ChatGPTAgent = "user" | "system";

// type for ChatGPTMessage
export type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

// type for OpenAIStreamPayload
export type OpenAIStreamPayload = {
  model: string;
  messages: ChatGPTMessage[];
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  temperature: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

const CHAT_COMPLETIONS_ENDPOINTS = process.env.OPENAI_CHAT_COMPLETIONS_ENDPOINT;

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter: number = 0;

  //POST req with payload
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  //stream response
  // more info: https://developer.mozilla.org/en-US/docs/Web/API/ReadableByteStreamController
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParseEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            // get the text from the first choice
            // more info openai API docs chat completion topic
            const text = json.choices[0].delta?.content || "";
            // if the text is empty or the counter is less than 2, do nothing
            if (counter < 2 && (text.match(/\n/) || [].length)) {
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(error);
          }
        }
      }

      // parser
      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({
  isUserMessage,
  text,
}: {
  isUserMessage: boolean;
  text: string;
}) {
  return (
    <Card
      className={cn(
        "text-md flex flex-row items-start gap-2 py-2 my-4 px-2 bg-slate-100 rounded-lg desktop:max-w-xl desktop:text-lg",
        {
          "bg-neutral-200": isUserMessage,
        }
      )}
    >
      {!isUserMessage ? (
        <CardHeader className="min-w-20 w-20 items-center">
          <Image
            src="/assets/pawprint-6503.svg"
            alt="Cat Assistant"
            className="object-fill"
            width={50}
            height={50}
          />
        </CardHeader>
      ) : null}
      <CardContent className="flex flex-col rounded-md desktop:px-2">
        <h4 className="text-xs font-semibold py-2">
          {isUserMessage ? "You" : "Whisker"}
        </h4>
        <div className="whitespace-pre-line">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ChatBubble({
  isUserMessage,
  text,
}: {
  isUserMessage: boolean;
  text: string;
}) {
  return (
    <div
      className={cn(
        "text-md flex flex-row items-start gap-2 py-2 my-4 px-2 bg-slate-100 rounded-lg desktop:w-2/6  desktop:text-xl",
        {
          "bg-neutral-200": isUserMessage,
        }
      )}
    >
      <div className={isUserMessage ? "hidden" : ""}>
        <Image
          src="/assets/pawprint-6503.svg"
          alt="Cat Assistant"
          className="object-cover scale-50"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col w-2/3 rounded-md desktop:px-4">
        <h4 className="text-xs font-semibold py-2">
          {isUserMessage ? "You" : "Whisker"}
        </h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

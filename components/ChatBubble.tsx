import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ChatResponsePDF from "@/components/ChatResponsePDF";
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from "lucide-react";

export default function ChatBubble({
  isUserMessage,
  text,
}: {
  isUserMessage: boolean;
  text: string;
}) {
  return (
    <>
    <Card
      className={cn(
        "text-md flex flex-row items-start gap-2 py-2 my-4 px-2 bg-whisker-orange text-whisker-black rounded-lg desktop:max-w-xl desktop:text-lg",
        {
          "bg-whisker-darkBlue text-whisker-white": isUserMessage,
        }
      )}
    >
      {!isUserMessage ? (
        <CardHeader className="min-w-20 w-20 items-center">
          <Image
            src="/assets/pawprint.svg"
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
          <ReactMarkdown className="leading-tight mb-2">{text}</ReactMarkdown>
        </div>
        
      </CardContent>
    </Card>
    {!isUserMessage && (
          <Button
            size='sm'
            className="text-whisker-white mt-2"
            onClick={() => {
              // handle button click event
            }}
          >
            <PDFDownloadLink
              document={<ChatResponsePDF text={text} />}
              fileName="chat-response.pdf"
            >
              {({ loading }) => (
                <>
                  
                  {loading ? <Loader2/> : <Download className="inline-block" />}
                </>
              )}
            </PDFDownloadLink>
          </Button>
        )}
    </>
  );
}

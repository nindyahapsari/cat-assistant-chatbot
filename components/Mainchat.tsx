import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Chatassistant from "./Chatassistant";

export default function Mainchat() {
  return (
    <div className="py-8 px-8 h-auto desktop:col-start-4 desktop:col-span-12 desktop:row-span-12">
      <div className="h-full p-4 flex flex-col justify-between">
        <div className="h-5/6">
          <Chatassistant />
        </div>
        <div className="px-4 flex w-full items-center space-x-2">
          <Textarea
            className="resize-none"
            placeholder="Type your message here."
          />
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </div>
  );
}

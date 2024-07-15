import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Funfact from "./Funfact";

export default function Sidebar() {
  return (
    <div className="bg-slate-100 p-8 desktop:col-span-3 desktop:row-span-12">
      <div className="h-full flex flex-col justify-around">
        <div className="h-full flex flex-col">
          <p className="text-2xl font-semibold">Cat Assistant</p>
          <Separator className="my-4" />

          <nav className="sidebar bg-gray-100 py-4">
            <ul>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Cat Breed Directory
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Favorites
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Recent Chats
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Care Tips
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Cat Facts
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-blue-600">
                  Cat of the Day
                </a>
              </li>
            </ul>
          </nav>
          <div className="h-5/6 my-8 w-full">
            <h4 className="text-semibold text-sm my-4">Recent Chat</h4>
            <ul>
              <li className="list-none text-2xl">Cat Breeds</li>
            </ul>
          </div>
          <div className="my-4">
            <Funfact />
          </div>
          <div>
            <Button className="w-full">Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

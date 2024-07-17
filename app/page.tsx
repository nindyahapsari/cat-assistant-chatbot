import MainChat from "@/components/MainChat";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  return (
    <div className="h-screen grid desktop:grid-cols-12 desktop:auto-rows-auto">
      <Sidebar />
      <MainChat />
    </div>
  );
}

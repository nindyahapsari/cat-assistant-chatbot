import Mainchat from "@/components/Mainchat";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen grid desktop:grid-cols-12 desktop:grid-rows-12">
      <Sidebar />
      <Mainchat />
    </div>
  );
}

import MainChat from "@/components/MainChat";

export default function Home() {
  return (
    <div className="grid desktop:max-h-[calc(100vh-3.5rem)] desktop:h-screen desktop:grid-cols-12">
      <MainChat />
    </div>
  );
}

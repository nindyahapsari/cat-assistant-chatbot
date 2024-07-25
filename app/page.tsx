import MainChat from "@/components/MainChat";

export default function Home() {
  return (
    <div className="h-screen grid desktop:grid-cols-12 desktop:auto-rows-auto">
      <MainChat />
    </div>
  );
}

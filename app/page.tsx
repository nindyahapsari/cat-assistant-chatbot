import MainChat from "@/components/MainChat";
import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <div className="h-screen grid desktop:grid-cols-12 desktop:auto-rows-auto">
      <SignIn />
      <MainChat />
    </div>
  );
}

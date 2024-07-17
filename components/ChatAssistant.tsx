import Image from "next/image";
export default function ChatAssistant() {
  return (
    <div className="w-full text-md flex flex-row items-center gap-2 py-2 bg-slate-100 rounded-lg desktop:w-3/6 desktop:text-xl">
      <div>
        <Image
          src="/assets/pawprint-6503.svg"
          alt="Cat Assistant"
          className="object-cover scale-50"
          width={50}
          height={50}
        />
      </div>
      <div className="w-2/3 rounded-md">
        <h4 className="text-xs font-semibold py-2">Cat Assistant</h4>
        <p>Hi, I'm your cat assistant. What can I do for you today? </p>
      </div>
    </div>
  );
}

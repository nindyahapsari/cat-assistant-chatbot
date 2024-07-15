import Image from "next/image";
export default function Chatassistant() {
  return (
    <div className="w-3/6 flex flex-row items-center gap-4 p-2 bg-slate-100 rounded-lg">
      <div>
        <Image
          src="/assets/pawprint-6503.svg"
          alt="Cat Assistant"
          className="object-cover scale-50"
          width={50}
          height={50}
        />
      </div>
      <div className="w-2/3  rounded-md">
        <h4 className="text-xs font-semibold py-2">Cat Assistant</h4>
        <p>Hi, I'm your cat assistant. What can I do for you today? </p>
      </div>
    </div>
  );
}

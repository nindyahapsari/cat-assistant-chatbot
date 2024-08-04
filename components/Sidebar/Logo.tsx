import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link
        href="/"
        className="flex flex-row justify-center items-center gap-2 font-semibold"
      >
        <Image
          alt="logo"
          className="scale-150"
          src="/assets/2.svg"
          width={100}
          height={100}
        />
        <span className="">Whisker</span>
      </Link>
    </>
  );
}

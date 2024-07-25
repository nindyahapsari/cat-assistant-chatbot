import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Signin() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

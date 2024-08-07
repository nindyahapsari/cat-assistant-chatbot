import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { MessagesProvider } from "@/context/messages";

const queryClient = new QueryClient();
const clerkPubKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "not found";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <ClerkProvider publishableKey={clerkPubKey}>{ui}</ClerkProvider>
      </MessagesProvider>
    </QueryClientProvider>
  );
}

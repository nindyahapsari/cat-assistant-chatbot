"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessagesProvider } from "@/context/messages";
import { ClerkProvider } from "@clerk/nextjs";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </MessagesProvider>
    </QueryClientProvider>
  );
}

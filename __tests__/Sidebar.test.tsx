import "@testing-library/jest-dom"; // Import the toBeInTheDocument function
import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";
import { SIDEBARLINKSINFO } from "@/components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { MessagesProvider } from "@/context/messages";

const queryClient = new QueryClient();

// jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));
jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: "",
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

const clerkPubKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "not found";
console.log("clerkPubKey", clerkPubKey);

function renderSidebarWithProvider() {
  return render(
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <ClerkProvider publishableKey={clerkPubKey}>
          <Sidebar>Test Content</Sidebar>
        </ClerkProvider>
      </MessagesProvider>
    </QueryClientProvider>
  );
}

describe("Sidebar Component", () => {
  it("renders the Sidebar component", () => {
    renderSidebarWithProvider();

    screen.debug();
    // Check if the logo is rendered
    // expect(screen.getByAltText("logo")).toBeInTheDocument();

    // Check if the sidebar links are rendered
    // SIDEBARLINKSINFO.forEach((link) => {
    //   expect(screen.getByText(link.name)).toBeInTheDocument();
    // });

    // Check if the children are rendered
    // expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it.skip("renders the loading state", () => {});
});

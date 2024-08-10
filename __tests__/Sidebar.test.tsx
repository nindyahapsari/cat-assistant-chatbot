import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import Sidebar from "@/components/Sidebar";
import { SIDEBARLINKSINFO } from "@/components/Sidebar";

//source: stackoverflow
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

describe("SIDEBARLINKSINFO", () => {
  it("contains the correct links", () => {
    expect(SIDEBARLINKSINFO).toEqual([
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: expect.any(Object),
      },
      {
        path: "/cat-profile",
        name: "Cat Profile",
        icon: expect.any(Object),
      },
    ]);
  });
});

describe("Sidebar Component", () => {
  it("renders the Sidebar component", () => {
    // renderSidebarWithProvider();
    renderWithProviders(<Sidebar>Test Content</Sidebar>);

    expect(screen.getByAltText("logo")).toBeInTheDocument();

    SIDEBARLINKSINFO.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});

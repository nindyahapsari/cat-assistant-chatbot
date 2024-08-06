import "@testing-library/jest-dom"; // Import the toBeInTheDocument function
import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";
import { SIDEBARLINKSINFO } from "@/components/Sidebar";
import React from "react";

describe("Sidebar Component", () => {
  it("renders the Sidebar component", () => {
	render(<Sidebar>Test Content</Sidebar>);

	// Check if the logo is rendered
	expect(screen.getByAltText("logo")).toBeInTheDocument();

	// Check if the sidebar links are rendered
	SIDEBARLINKSINFO.forEach((link) => {
	  expect(screen.getByText(link.name)).toBeInTheDocument();
	});

	// Check if the children are rendered
	expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it.skip("renders the loading state", () => {
	// Mock useState to return false initially
	jest.spyOn(React, "useState").mockImplementationOnce(() => [false, jest.fn()]);

	render(<Sidebar>Test Content</Sidebar>);

	// Check if the loading component is rendered
	expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
// test-utils.tsx
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ClerkProvider } from "@clerk/nextjs";

const mockUser = {
    id: "user_1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
};

const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
    render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
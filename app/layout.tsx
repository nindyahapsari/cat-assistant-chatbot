import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cat-chat",
  description: "cat assistant chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${poppins.className} bg-whisker-white overflow-hidden`}>
            <Sidebar>
            {children}
            </Sidebar>          
        </body>
      </Providers>
    </html>
  );
}

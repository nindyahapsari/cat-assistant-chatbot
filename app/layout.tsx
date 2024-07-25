import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className} bg-slate-200 flex flex-row`}>
          <div className="h-screen w-1/6">
            <Sidebar />
          </div>
          <div className="w-5/6">{children}</div>
        </body>
      </Providers>
    </html>
  );
}

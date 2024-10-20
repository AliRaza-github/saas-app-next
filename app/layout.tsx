import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "react-loading-skeleton/dist/skeleton.css"
import Providers from "../components/Providers";
import { Toaster } from "@/components/ui/toaster";
import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Toaster/>
          <Navbar />
          {children}
        </body>
          </Providers>      
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import BookEventContextProvider from "./context/bookeventcontext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TickEvent",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <Toaster/>
        <BookEventContextProvider>
        {children}
        </BookEventContextProvider>

        </body>
    </html>
      </ClerkProvider>
  );
}

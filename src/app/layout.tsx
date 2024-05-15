import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { MoonIcon } from "@radix-ui/react-icons"
import "./globals.css";
import { Button } from "@/components/ui/button";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["300", "600", "800"] });

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
      <body className={nunitoSans.className}>
        <nav className="w-full bg-white shadow-md">
          <div className="px-6 py-8 flex justify-between container">

          <span className="font-extrabold text-lg">Where in the world?</span>
          <Button variant={"ghost"} className="bg-white text-foreground font-semibold flex items-center gap-1">
            <MoonIcon className="size-5" />
            Dark Mode
          </Button>
          </div>
        </nav>
        <div className="container px-6 py-8">
        {children}
        </div>
        </body>
    </html>
  );
}

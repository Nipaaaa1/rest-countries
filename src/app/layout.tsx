import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
});

export const metadata: Metadata = {
  title: "Rest Countries by Devan",
  description: "This is a solution to a challenge in frontend master.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full bg-white shadow-md dark:bg-card">
            <div className="container flex justify-between px-6 py-8">
              <span className="text-lg font-extrabold">
                Where in the world?
              </span>
              <ThemeToggle />
            </div>
          </nav>
          <div className="container space-y-12 px-6 py-8">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

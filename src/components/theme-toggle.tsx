"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <>
      <Button
        variant={"ghost"}
        className="flex items-center gap-1 bg-white font-semibold text-foreground dark:hidden"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className="size-5" />
        <span>Dark Mode</span>
      </Button>
      <Button
        variant={"ghost"}
        className="hidden items-center gap-1 bg-card font-semibold text-foreground dark:flex"
        onClick={() => setTheme("light")}
      >
        <SunIcon className="size-5" />
        <span>Light Mode</span>
      </Button>
    </>
  );
};

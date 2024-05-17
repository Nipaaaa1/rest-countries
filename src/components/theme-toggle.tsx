"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon } from "@radix-ui/react-icons";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      className="flex items-center gap-1 bg-white font-semibold text-foreground dark:bg-card"
      onClick={() => setTheme("dark")}
    >
      <MoonIcon className="size-5" />
      <span>Dark Mode</span>
    </Button>
  );
};

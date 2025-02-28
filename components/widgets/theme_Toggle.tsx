"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { useState } from "react";
export function ChangeTheme() {
  const { setTheme } = useTheme();
  const [theme, setThemeTitle] = useState("");
  const changeTheme = () => {
    if (theme == "light") {
      setTheme("dark");
      setThemeTitle("dark");
    } else {
      setTheme("light");
      setThemeTitle("light");
    }
  };
  return (
    <>
      {theme == "light" ?<Moon className="size-8 hover:cursor-pointer" onClick={changeTheme}/>:<Sun className="size-8 hover:cursor-pointer" onClick={changeTheme}/>}
    </>
  )
}

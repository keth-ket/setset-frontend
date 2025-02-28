"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";




import { useState } from "react";
export function ChangeTheme() {
  const {  setTheme , theme} = useTheme();
  const [currTheme, setCurrTheme] = useState(theme);

  // usestate to change theme
  const changeTheme = () => {
    if (theme == "light") {
      setTheme("dark");
      setCurrTheme("dark");
    } else {
      setTheme("light");
      setCurrTheme("light");
    }
  };
  return (
    <>
      {currTheme == "light" ?<Moon className="size-8 hover:cursor-pointer" onClick={changeTheme}/>:<Sun className="size-8 hover:cursor-pointer" onClick={changeTheme}/>}
    </>
  )
}

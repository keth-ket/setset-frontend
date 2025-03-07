import { useContext } from "react";
import { DateContext } from "@/context/DateContext";

export function useDateRange() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateProvider");
  }
  return context;
}

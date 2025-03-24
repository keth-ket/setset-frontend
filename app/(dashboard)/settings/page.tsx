"use client";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <h1>Welcome to the Settings Page</h1>
      <Button onClick={() => redirect("/")}>Go Home</Button>
    </div>
  );
}

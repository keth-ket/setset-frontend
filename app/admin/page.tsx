import React from "react";
import Business from "@/components/widgets/admin/business-card";
import { ModeToggle } from "@/components/widgets/theme-toggle";

export default function Page() {
  return (
    <>
      <div>
        <div className="mt-6 flex flex-col gap-y-6 p-8 pt-0">
          <ModeToggle />
          <Business />
        </div>
      </div>
    </>
  );
}

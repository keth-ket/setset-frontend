"use client";

import { useEffect } from "react";

import { Card } from "@/components/ui/card";
import { settingMenu } from "@/lib/sample-data";

import { Invoices } from "./invoices";
import { Password } from "./password-section";
import { Plan }  from "./plan/plan";
import { Profile } from "./profile/profile";
export function MainContent({
  changeView,
}: {
  changeView: (view: string) => void;
}) {
  // const [viewSection, setViewSection] = useState<string>("");
  const sectionIds = settingMenu.map((item) => item.url);
  // console.log("sectionId", sectionIds);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // setViewSection(entry.target.id);
            changeView(entry.target.id);
          }
        });
      },
      {
        threshold: 1.0,
      },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
        //  console.log('here is the section', section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, changeView]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-col gap-96">
        <Profile/>
        <Password />
        <Card className="h-[300px] p-6" id="Card-Information">
          Card Information
        </Card>
        <Plan onClickUpdate={() => scrollToSection("Card-Information")}/>
        <Card className="h-[300px] p-6" id="Calendar">
          Calendar
        </Card>
        <div id="Invoices">
          <Invoices plan="monthly"/>
        </div>

        <Card className="h-[300px] p-6" id="Support">
          Support
        </Card>
      </div>
    </div>
  );
}

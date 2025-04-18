import { Card, CardHeader } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { CircleCheckBig } from "lucide-react";
import React, { useState } from "react";
import InnerCard from "./inner-card";
import { planFeature } from "@/lib/types";

interface PlanProps {
  onClickUpdate: () => void;
}

const innerCardFormat = "flex flex-col w-full lg:w-[30%] xl:w-1/4 gap-4 border border-foreground p-4 justify-between h-[520px]";
const innerCardHeaderFormat = "flex flex-col items-center text-center md:h-24 lg:h-28"
const innerCardHeaderText = "text-xl md:text-2xl xl:text-3xl";
const afterHourPlanFeatures = [
  "Activate after business hours",
  "Every missed captured until next day",
  "Seamlessly handle",
];

const innerCardFeaturesFormat = "flex flex-row items-baseline gap-2";
const innerCardIconFormat = "shrink-0 size-3";
const innerCardContentFormat = "flex flex-col items-start gap-4";
const allDayFeatures = [
  "24/7 round the clock support", 
  "Off-peak coverage",
  "All previous features apply",
];

const enterpriseFeatures = [
  "Manage multpile phone numbers",
  "All previous features apply",
];

const planHandleFeatures = [
  "Booking",
  "Inquiries",
  "Upselling",
  "Emergency Triage",
];

const features : planFeature[] = 
[
  {
    title: "Activate after business hours", 
    subFeatures: []
  },
  {
    title: "Every missed captured until next day",
    subFeatures: []
  },
  { 
    title: "Seamlessly handle:",
    subFeatures: planHandleFeatures
  }
];



export function Plan({onClickUpdate}: PlanProps) {

  const [isUpdating, setUpdate] = useState(false);
  //TODO: move innerCard to a separate .tsx file

  return (
    <Card className="flex flex-col gap-2 p-6" id="Plans">
      {isUpdating ? (
        <div className="flex flex-col">
          <CardHeader className="px-0 pb-7 pt-0 text-xl md:text-2xl lg:text-3xl">
            Choose your plan
          </CardHeader>
          <div className="w-full flex lg:flex-row justify-between flex-col gap-4">
            <Card className={innerCardFormat}>
              <div>
              <div className={innerCardHeaderFormat}>
                <p className={innerCardHeaderText}>AFTER - HOUR <br/> AGENT</p>
                <div className="flex flex-row items-center gap-1">
                  <p>CAD</p>
                  <p className="font-bold">249.00</p>
                  <p>/month</p>
                </div>
              </div>
              <div className={innerCardContentFormat}>
                {afterHourPlanFeatures.map((feature) => (
                  <div key={feature}>
                    {feature === "Seamlessly handle" ? (
                      <div>
                        <div className={innerCardFeaturesFormat}>
                          <CircleCheckBig className="shrink-0 size-3" />
                          <p>{feature}:</p>
                        </div>
                        <div className="flex flex-col gap-0 pl-6">
                          {planHandleFeatures.map((handleFeature: string) => (
                            <div key={handleFeature}>• {handleFeature}</div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={innerCardFeaturesFormat}>
                        <CircleCheckBig className="shrink-0 size-3" />
                        <p className="flex flex-wrap">{feature}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>  
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="text-[#2a870b]">
                  Get the first 3 months for free
                </div>
                <Button className="w-full" variant={"green"}>
                  Upgrade to Anual
                </Button>
              </div>
            </Card>
            <Card className={innerCardFormat}>
            <div className="flex flex-col">
              <div className={innerCardHeaderFormat}>
                <p className={innerCardHeaderText}>24/7 
                  <br/>
                   AGENT
                </p>
                <div className="flex flex-row items-center gap-1">
                  <p>CAD</p>
                  <p className="font-bold">799.00</p>
                  <p>/month</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                {allDayFeatures.map((feature) => (
                  <div key={feature}>
                    <div className={innerCardFeaturesFormat}>
                        <CircleCheckBig className={innerCardIconFormat} />
                        <p>{feature}</p>
                      </div>
                  </div>
                ))}
              </div>
              </div>
              <div className="flex items-center justify-center">
                <Button className="w-full" variant={"green"}>
                  Upgrade
                </Button>
              </div>
            </Card>
            <Card className={innerCardFormat}>
              <div className="flex flex-col">
              <div className={innerCardHeaderFormat}>
                <p className={innerCardHeaderText}>ENTERPRISE <br/> AGENT</p>
                <div className="flex flex-row items-center gap-1">
                  <p>CAD</p>
                  <p className="font-bold">899.00+</p>
                  <p>/month</p>
                </div>
              </div>
              <div className={innerCardContentFormat}>
                {enterpriseFeatures.map((feature) => (
                  <div key={feature}>
                    <div className={innerCardFeaturesFormat}>
                        <CircleCheckBig className={innerCardIconFormat} />
                        <p>{feature}</p>
                      </div>
                  </div>
                ))}
              </div>
              </div>   
              <div className="flex items-center justify-center">
                <Button className="w-full" variant={"green"}>
                  Upgrade
                </Button>
              </div>
            </Card>
          </div>

          <Button className="w-[225px] mt-4 self-end" variant="outline" 
            onClick={() => setUpdate(false)}
          >
              Cancel
          </Button>
        </div>
      ) : (
        <>
          <CardHeader className="px-0 pb-7 pt-0 text-xl md:text-2xl lg:text-3xl">
            Current Plan
          </CardHeader>
          <InnerCard
            innerCardHeaderText = {innerCardHeaderText}
            features = {features}
            innerCardIconFormat = {innerCardIconFormat}
            innerCardContentFormat = {innerCardContentFormat}
            onClickUpdate = {onClickUpdate}
            setUpdate = {setUpdate}
           />
        </>
      )}
    </Card>
  );
}

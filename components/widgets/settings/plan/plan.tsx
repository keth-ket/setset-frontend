import { CircleCheckBig } from "lucide-react";
import React, { useState } from "react";

import { agentPlan,planFeature } from "@/lib/types";

import { Button } from "../../../ui/button";
import { Card, CardHeader } from "../../../ui/card";
import InnerCard from "./inner-card";

interface PlanProps {
  onClickUpdate: () => void;
}
const innerCardFormat =
  "flex flex-col w-full lg:w-[30%] gap-4 border border-foreground p-4 justify-between h-[520px]";
const innerCardHeaderFormat = "flex flex-col items-center text-center h-28";
const innerCardHeaderText = "text-xl md:text-2xl xl:text-3xl";

const innerCardFeaturesFormat = "flex flex-row items-baseline gap-2";
const innerCardIconFormat = "shrink-0 size-3";
const innerCardContentFormat = "flex flex-col items-start gap-4";

const enterpriseFeatures: planFeature[] = [
  {
    title: "Manage multpile phone numbers",
    subFeatures: [],
  },
  {
    title: "All previous features apply",
    subFeatures: [],
  },
];

const planHandleFeatures = [
  "Booking",
  "Inquiries",
  "Upselling",
  "Emergency Triage",
];

const allDayFeatures: planFeature[] = [
  {
    title: "24/7 round the clock support",
    subFeatures: [],
  },
  {
    title: "Off-peak coverage",
    subFeatures: [],
  },
  {
    title: "All previous features apply",
    subFeatures: [],
  },
];

const afterHourFeatures: planFeature[] = [
  {
    title: "Activate after business hours",
    subFeatures: [],
  },
  {
    title: "Every missed captured until next day",
    subFeatures: [],
  },
  {
    title: "Seamlessly handle:",
    subFeatures: planHandleFeatures,
  },
];

const allDayAgent: agentPlan = {
  planTitle: "24/7",
  planFeatures: allDayFeatures,
  planPrice: 299.0,
};

const afterHourAgent: agentPlan = {
  planTitle: "after - hour",
  planFeatures: afterHourFeatures,
  planPrice: 249.0,
};

const enterpriseAgent: agentPlan = {
  planTitle: "enterprise",
  planFeatures: enterpriseFeatures,
  planPrice: 899.0,
};

const agents: agentPlan[] = [afterHourAgent, allDayAgent, enterpriseAgent];

const currentAgent = afterHourAgent;
export function Plan({ onClickUpdate }: PlanProps) {
  const [isUpdating, setUpdate] = useState(false);

  return (
    <Card className="flex flex-col gap-2 p-6" id="Plans">
      {isUpdating ? (
        <div className="flex flex-col">
          <CardHeader className="px-0 pb-7 pt-0 text-xl md:text-2xl lg:text-3xl">
            Choose your plan
          </CardHeader>
          <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
            {agents.map((agent) => (
              <Card key={agent.planTitle} className={innerCardFormat}>
                <div className="flex flex-col">
                  <div className={innerCardHeaderFormat}>
                    <p className={innerCardHeaderText}>
                      {agent.planTitle.toUpperCase()} <br /> AGENT
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <p>CAD</p>
                      <p className="font-bold">
                        {agent.planPrice.toFixed(2)}
                        {agent.planTitle.toUpperCase() === "ENTERPRISE" && "+"}
                      </p>
                      <p>/month</p>
                    </div>
                  </div>
                  <div className={innerCardContentFormat}>
                    {agent.planFeatures.map((feature) => (
                      <div key={feature.title} className="flex flex-col gap-1">
                        <div className={innerCardFeaturesFormat}>
                          <CircleCheckBig className={innerCardIconFormat} />
                          <p>{feature.title}</p>
                        </div>
                        {/* Sub-features if any */}
                        {feature.subFeatures.length > 0 && (
                          <div className="ml-5 flex flex-col gap-1">
                            {feature.subFeatures.map((sub, idx) => (
                              <div
                                key={idx}
                                className={innerCardFeaturesFormat}
                              >
                                <CircleCheckBig
                                  className={innerCardIconFormat}
                                />
                                <p>{sub}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center justify-center gap-2">
                  {agent === currentAgent && (
                    <p className="text-[#2a870b]">
                      Get the first 3 months for free
                    </p>
                  )}
                  <Button className="w-full" variant="green">
                    {agent === currentAgent ? "Upgrade to Annual" : "Upgrade"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Button
            className="mt-4 w-[225px] self-end"
            variant="outline"
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
            agentPlan={afterHourAgent}
            innerCardHeaderText={innerCardHeaderText}
            innerCardIconFormat={innerCardIconFormat}
            innerCardContentFormat={innerCardContentFormat}
            onClickUpdate={onClickUpdate}
            setUpdate={setUpdate}
          />
        </>
      )}
    </Card>
  );
}

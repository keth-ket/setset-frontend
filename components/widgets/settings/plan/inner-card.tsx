import { Card, CardHeader } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { CircleCheckBig } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { planFeature } from "@/lib/types";

interface innerCardProps
{
    innerCardHeaderText : string,
    features : planFeature[],
    innerCardIconFormat: string,
    innerCardContentFormat: string,
    onClickUpdate: () => void
    setUpdate: (val: boolean) => void;
}

const InnerCard = ({
    innerCardHeaderText,
    features,
    innerCardIconFormat,
    innerCardContentFormat,
    onClickUpdate,
    setUpdate
}: innerCardProps) => {
    return(
        <Card className="flex flex-col gap-4 border border-foreground p-4">
        <div className="flex flex-col items-center pb-2">
          <p className={innerCardHeaderText}>AFTER - HOUR AGENT</p>
          <div className="flex flex-row items-center gap-1">
            <p>CAD</p>
            <p className="font-bold">249.00</p>
            <p>/month</p>
          </div>
        </div>
        <div className={innerCardContentFormat}>
          {features.map((feature) => (
            <div key={feature.title}>
                <div className="flex flex-row items-center gap-2">
                    <CircleCheckBig className={innerCardIconFormat} />
                    <p>{feature.title}</p>
                </div>
                <div className="flex flex-col gap-0 pl-6">
                {feature.subFeatures.map((subFeature) => (  
                    <div key={subFeature}>• {subFeature}</div>
                ))}
                </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button 
          className="w-fit" 
          variant={"green"}
          onClick={() => setUpdate(true)}
          >
            Change Plan
          </Button>
        </div>
        <Separator className="mt-2 h-0.5 bg-foreground" />

        <div className="flex flex-row justify-between items-center pt-1">
          <div className="flex flex-col">
              <div className="text-xs font-bold text-foreground/70">
                Renewal Date
              </div>
              <div>May 30, 2025</div>
          </div>
          <Button className="" variant="greenText">
              Cancel Plan
          </Button>
        </div>

        <div className="flex flex-row justify-between items-center pt-1">
          <div className="flex flex-col">
              <div className="text-xs font-bold text-foreground/70">
                Payment Method
              </div>
              <div>Visa ***1234</div>
          </div>
          <Button className="" variant="greenText"
          onClick={onClickUpdate}>
            Update
          </Button>
        </div>
      </Card>
    )
}

export default InnerCard;
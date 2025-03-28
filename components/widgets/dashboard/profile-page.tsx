import { Pencil, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileImage } from "@/components/widgets/dashboard/profile-page-component/profile-image";
import EditableField from "./profile-page-component/EditableField";

const profileComponentFormat ="flex flex-row justify-between items-center gap-20";

export default function ProfilePage() {
  const [name, setName] = useState("Business Name");
  const [email, setEmail] = useState("ExampleEmail@org.com");
  const [phone, setPhone] = useState("0123456789");
  const [category, setCategory] = useState("Business Category");

  const uniqueCategories = [
    "Retail & Ecommerce",
    "Healthcare",
    "Tech",
    "Finance",
  ];

  const [timezone, setTimezone] = useState("GMT-7:00"); // Auto-detect timezone
  // Get formatted timezone options
  const timezoneOptions = Array.from({ length: 25 }, (_, i) => {
    const offset = i - 12; // Shifts range to -12 to +12
    const sign = offset >= 0 ? "+" : "";
    return {
      value: `GMT${sign}${offset}:00`,
      label: `GMT${sign}${offset}:00`,
    };
  });
  return (
    <div className="flex w-full flex-col items-start gap-y-8 pb-6">
      <div className="flex w-full flex-row">      
        <ProfileImage initialImage="/images/logo.png" className="" />
        <div>
          <div className="-ml-4 flex w-fit justify-start">
            <EditableField
              value={name}
              onSave={setName}
              validate={(value) => value.length > 5}
              placeholder="Enter name..."
              errorMessage="Name must be at least 5 characters long."
              componentFormat="flex flex-row justify-between w-full p-0 rounded-lg text-lg font-bold gap-3"
            />
          </div>
          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <p className="text-sm">{timezone}</p>
              <DropdownMenuTrigger asChild>
                <Button className="h-5 w-5">
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] w-[350px] overflow-y-auto">
                {timezoneOptions.map((tz) => (
                  <DropdownMenuItem
                    className="text-sm"
                    key={tz.value}
                    onClick={() => {
                      setTimezone(tz.value);
                    }}
                  >
                    {tz.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
        
      <div className="flex flex-col gap-6"> 
        <div className="flex flex-row justify-between items-center gap-20">
          <DropdownMenu>
            <p>{category}</p>
            <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8">
                <Pencil />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="flex w-full flex-col justify-end"
              align="end"
            >
              {uniqueCategories.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-row justify-between">
          <EditableField
            value={phone}
            onSave={setPhone}
            validate={(value) => /^\d{9,}$/.test(value)}
            placeholder="Enter phone number..."
            errorMessage="Phone number must be at least 9 digits long."
            componentFormat={profileComponentFormat}
          />
        </div>

        <div className="flex flex-row justify-between">
          <EditableField
            value={email}
            onSave={setEmail}
            validate={(value) => /^\S+@\S+\.\S+$/.test(value)}
            placeholder="Enter email..."
            errorMessage="Invalid email format. Your email should be in this format example@example.com"
            componentFormat={profileComponentFormat}
          />
        </div>
      </div>
      <div className="absolute bottom-6 tems-center justify-center">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

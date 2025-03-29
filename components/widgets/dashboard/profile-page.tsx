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

const profileComponentFormat =
  "flex flex-col items-start gap-1";

export default function ProfilePage() {
  const [name, setName] = useState("Business Name");
  const [email, setEmail] = useState("ExampleEmail@org.com");
  const [phone, setPhone] = useState("0123456789");
  const [category, setCategory] = useState("Business Category");

  const [isEditing, setIsEditing] = useState(false);
  const uniqueCategories = [
    "Retail & Ecommerce",
    "Healthcare",
    "Tech",
    "Finance",
  ];

  const imageSize = 100;
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
    <div className="flex w-full flex-col pb-6">
      <div className="flex w-full flex-row items-start gap-6">
        <ProfileImage
          initialImage="/images/logo.png"
          className=""
          imageSize={imageSize}
        />
        <div
          className="flex flex-col gap-6"
          style={{ marginTop: `${imageSize / 2 - imageSize / 5}px` }}
        >
          <div>
            <div className="flex w-fit flex-row justify-start gap-3">
              <EditableField
                value={name}
                placeholder="Enter name..."
                componentFormat="flex flex-col w-full p-0 rounded-lg text-2xl font-bold gap-1"
                isEditing={isEditing}
                fieldName="Business Name"
              />
              {!isEditing && (
                <Button
                  className="flex h-8 w-8 rounded-lg"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil></Pencil>
                </Button>
              )}
            </div>
            {isEditing ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-none focus-visible:ring-0">
                    <p className="text-sm text-foreground/80">{timezone}</p>
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
            ) : (
              <p className="text-sm text-foreground/80">{timezone}</p>
            )}
          </div>
          {isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="focus-visible:ring-0">
                  <p>{category}</p>
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
          ) : (
            <p>{category}</p>
          )}

          <div className="flex flex-row justify-between">
            <EditableField
              value={phone}
              placeholder="Enter phone number..."
              componentFormat={profileComponentFormat}
              isEditing={isEditing}
              fieldName="Phone Number"
            />
          </div>

          <div className="flex flex-row justify-between">
            <EditableField
              value={email}
              placeholder="Enter email..."
              componentFormat={profileComponentFormat}
              isEditing={isEditing}
              fieldName="Email"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform">
        <Button disabled={!isEditing} onClick={() => setIsEditing(false)}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

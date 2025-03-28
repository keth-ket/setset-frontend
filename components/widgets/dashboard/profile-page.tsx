import { Pencil } from "lucide-react";
import { useState} from "react";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ProfileImage} from "@/components/widgets/dashboard/profile-page-component/profile-image";
import EditableField from "./profile-page-component/EditableField";


const profileComponentFormat =
  "flex flex-row justify-between items-center border-2 rounded-lg border-foreground p-2 w-full";
const pencilFormat = "flex";


export default function ProfilePage() {
  const [name, setName] = useState("Business Name");
  const [email, setEmail] = useState("ExampleEmail@org.com");
  const [phone, setPhone] = useState("Business Phone Number");
  const [category, setCategory] = useState("Business Category");

  const uniqueCategories = [
    "Retail & Ecommerce",
    "Healthcare",
    "Tech",
    "Finance",
  ];
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  const handlePhoneChange = () => {
    if (!/^\d{9,}$/.test(newPhone)) {
      alert("Phone number must be at least 9 digits and contain only numbers.");
      return;
    }
    setPhone(newPhone);
    setIsEditingPhone(false);
  };

  const [timezone, setTimezone] = useState(moment.tz.guess()); // Auto-detect timezone
  // Get formatted timezone options
  const timezoneOptions = moment.tz.names().map((tz) => ({
    value: tz,
    label: `(GMT${moment.tz(tz).format("Z")}) ${tz.replace(/_/g, " ")}`,
  }));

  const validateName = (newName: string) => newName.length >= 5;
  return (
    <div className="flex w-full flex-col items-start gap-y-6 pb-6">
      <div className="flex flex-row w-full">
        <ProfileImage
        initialImage="/images/logo.png"
        className=""
        />
        <div className="flex -ml-4 justify-start w-fit">
        <EditableField
          value={name}
          onSave={setName}
          validate={validateName}
          placeholder="Enter name..."
          componentFormat="flex flex-row justify-between border-2 w-full p-2 border-foreground rounded-lg text-lg"
        />
        </div>
      </div>

      <div className="flex flex-col gap-y-6"> 
        <div>
          <EditableField
            value={email}
            onSave={setEmail}
            validate={(value) => /^\S+@\S+\.\S+$/.test(value)}
            placeholder="Enter email..."
            componentFormat={profileComponentFormat}
            />
        </div>
        <div className={profileComponentFormat}>
          {isEditingPhone ? (
            <>
              <input
                placeholder="Editing Phone Number..."
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
              <Button onClick={handlePhoneChange}>Save</Button>
            </>
          ) : (
            <>
              <p>{phone}</p>
              <Button
                className="flex rounded-lg"
                onClick={() => setIsEditingPhone(true)}
              >
                <Pencil className={pencilFormat} size={16} />
              </Button>
            </>
          )}
        </div>

        <div className={profileComponentFormat}>
          {/*Category*/}
          <DropdownMenu>
            {category}
            <DropdownMenuTrigger asChild>
              <Button>
                <Pencil/>
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

        <div className={profileComponentFormat}>
            <DropdownMenu>
            {`(GMT${moment.tz(timezone).format('Z')})`}
              <DropdownMenuTrigger asChild>
                <Button>
                  <Pencil/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] w-[350px] overflow-y-auto">
                {timezoneOptions.map((tz) => (
                  <DropdownMenuItem
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

      <div className="items-center justify-center">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

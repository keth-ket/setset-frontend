import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New Message from Alex",
    content: "Hey! Are we still on for the meeting?",
    time: "2 mins ago",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "System Update",
    content: "Your system update has been scheduled for tonight.",
    time: "10 mins ago",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png", // Alert icon
    read: false,
  },
  {
    id: 3,
    type: "friend_request",
    title: "New Friend Request",
    content: "Jordan sent you a friend request.",
    time: "30 mins ago",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    title: "You were mentioned!",
    content: "Sophia mentioned you in a comment.",
    time: "1 hour ago",
    img: "https://cdn-icons-png.flaticon.com/512/2958/2958783.png", // Mention icon
    read: false,
  },
  {
    id: 5,
    type: "reminder",
    title: "Event Reminder",
    content: "Don't forget about the project deadline tomorrow!",
    time: "3 hours ago",
    img: "https://cdn-icons-png.flaticon.com/512/716/716225.png", // Reminder icon
    read: true,
  },
];

const notification = notifications.map((notification) => (
  <div key={notification.id} className="mb-4 flex items-center space-x-4">
    <Avatar>
      <AvatarImage src={notification.img} />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{notification.title}</p>
      <p className="text-sm text-muted-foreground">{notification.content}</p>
      <div className="flex items-center pt-2">
        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
        <span className="text-xs text-muted-foreground">
          Joined December 2021
        </span>
      </div>
    </div>
  </div>
));

export function MobileNotification() {
  return (
    <Sheet>
      <SheetTrigger>
        <Bell />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        {notification}
      </SheetContent>
    </Sheet>
  );
}

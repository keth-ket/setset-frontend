
import { Bell, CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet";
import { initialNotifications } from "@/lib/sampleData";

interface notificationObject {
  id: number;
  type: string;
  title: string;
  content: string;
  time: string;
  img: string;
  read: boolean;
}
export function NotificationList({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return notifications.length > 0 ? (
    notifications.map((notification) => (
      <div
        key={notification.id}
        className="relative mb-4 flex items-center space-x-4 pt-3"
      >
        <Avatar>
          <AvatarImage src={notification.img} />
          <AvatarFallback>Set</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            {notification.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {notification.content}
          </p>
          <div className="flex items-center pt-2">
            <CalendarIcon className="mr-2 size-4 opacity-70" />
            <span className="text-xs text-muted-foreground">
              {notification.time}
            </span>
          </div>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="absolute right-1 top-1 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No new notifications</p>
  );
}

export function MobileNotification({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger>
      <span className="relative" >
          {notifications.length > 0 && <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-red-500 px-2 text-xs font-semibold text-white">
            {notifications.length}
          </span>}
          <Bell />
        </span>
      </SheetTrigger>
      <SheetContent className="rounded-xl">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
           
          </SheetDescription>
        </SheetHeader>
        <NotificationList
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopNotification({
  notifications,
  removeNotification,
}: {
  notifications: notificationObject[];
  removeNotification: (id: number) => void;
}) {
  return (
    <HoverCard >
      <HoverCardTrigger asChild  className= "rounded-lg">
      <span className="relative" >
          {notifications.length > 0 && <span className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-red-500 px-2 text-xs font-semibold text-white">
            {notifications.length}
          </span>}
          <Bell />
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-xl">
        <NotificationList
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </HoverCardContent>
    </HoverCard>
  );
}

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 600);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return isMobile ? (
    <MobileNotification
      notifications={notifications}
      removeNotification={removeNotification}
    />
  ) : (
    <DesktopNotification
      notifications={notifications}
      removeNotification={removeNotification}
    />
  );
}

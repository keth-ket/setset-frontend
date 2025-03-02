import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Bell, CalendarIcon } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { useState, useEffect } from "react";
  
  const initialNotifications = [
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
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/2958/2958783.png",
      read: false,
    },
    {
      id: 5,
      type: "reminder",
      title: "Event Reminder",
      content: "Don't forget about the project deadline tomorrow!",
      time: "3 hours ago",
      img: "https://cdn-icons-png.flaticon.com/512/716/716225.png",
      read: true,
    },
  ];
  
  export function NotificationList({ notifications, removeNotification }) {
    return notifications.length > 0 ? (
      notifications.map((notification) => (
        <div
          key={notification.id}
          className="mb-4 flex items-center space-x-4 pt-3 relative"
        >
          <Avatar>
            <AvatarImage src={notification.img} />
            <AvatarFallback>Set</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.content}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </div>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-gray-500 hover:text-red-500 absolute top-1 right-1"
          >
            ✕
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No new notifications</p>
    );
  }
  
  export function MobileNotification({ notifications, removeNotification }) {
    return (
      <Sheet>
        <SheetTrigger>
          <Bell />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <NotificationList
            notifications={notifications}
            removeNotification={removeNotification}
          />
        </SheetContent>
      </Sheet>
    );
  }
  
  export function DesktopNotification({ notifications, removeNotification }) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Bell />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
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
  
    const removeNotification = (id:number) => {
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
  
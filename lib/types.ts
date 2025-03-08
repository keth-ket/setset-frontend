import { DateRange } from "react-day-picker";

export type DateContextType = {
  dateRange?: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export type MetricsData = {
  callMinutes: {
    minutes: number;
    difference: number;
  };
  moneySaved: {
    money: number;
    difference: number;
  };
  timeSaved: {
    time: number;
    difference: number;
  };
  newCallers: {
    callers: number;
    difference: number;
  };
  appointmentsBooked: {
    appointments: number;
    difference: number;
  };
  satisfactionScore: {
    score: number;
    difference: number;
  };
};

export type FaqData = {
  id: string;
  question: string;
  answer: string;
  frequency: number;
  icon: React.ReactNode;
  timeRangeStart: string;
  timeRangeEnd: string;
};

export type AppointmentsData = {
  date: string;
  booked: number;
  transferred: number;
};

export type CallRecording = {
  id: string;
  date: string;
  category: "Booking" | "Cancellation" | "General Inquiry" | "Reschedule";
  confidenceScore: number;
  duration: string;
  recordingUrl: string;
  transcriptUrl: string;
};

export type AppointmentsRadar = {
  type: "Booked" | "Cancelled" | "Transferred" | "Rescheduled";
  customers: number;
};

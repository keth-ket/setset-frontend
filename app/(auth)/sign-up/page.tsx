"use client";
import { isBefore, isWeekend } from "date-fns";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BUSINESS_CATEGORIES, BUSINESS_GOALS } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function SignUpPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" or "prev"

  const [formData, setFormData] = useState<{
    businessType: string;
    numOfCustomers: string;
    businessGoal: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    appointmentDate: Date | null;
    appointmentTime: string;
  }>({
    businessType: "Category",
    numOfCustomers: "Size",
    businessGoal: "Goal",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    appointmentDate: null,
    appointmentTime: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  type TimeSlot = {
    time: string;
    display: string;
    available: boolean;
  };

  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Generate mock available time slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      // TODO: fetch available slots from backend
      const mockTimeSlots = generateMockTimeSlots(selectedDate);
      setAvailableTimeSlots(mockTimeSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Trigger the animation after component mounts with a slightly longer delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200); // Increased delay to ensure DOM is fully ready

    return () => clearTimeout(timer);
  }, []);

  // Generate mock time slots for the selected date
  const generateMockTimeSlots = (_: Date) => {
    const slots = [];

    // Adding more slots for weekdays, fewer for weekends
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // full hour slot
      slots.push({
        time: `${hour}:00`,
        display: `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`,
        available: Math.random() > 0.3, // Randomly make some slots unavailable
      });

      // half hour slot
      slots.push({
        time: `${hour}:30`,
        display: `${hour === 12 ? 12 : hour % 12}:30 ${hour < 12 ? "AM" : "PM"}`,
        available: Math.random() > 0.3, // Randomly make some slots unavailable
      });
    }

    return slots;
  };

  // Calendar date disabler function - disable past dates and weekends
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates and weekends
    return isBefore(date, today) || isWeekend(date);
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Reset time selection when date changes
      setFormData((prev) => ({
        ...prev,
        appointmentDate: date,
        appointmentTime: "",
      }));
    }
  };

  // Handle time slot selection
  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setFormData((prev) => ({
        ...prev,
        appointmentTime: slot.display,
      }));
    }
  };

  // Handle booking confirmation
  const handleBookAppointment = () => {
    // TODO: send booking details to backend
    setBookingComplete(true);
    console.log("Appointment booked:", {
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      contact: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Move to next step with animation
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 0 && formData.businessType === "Category") return;
    if (currentStep === 1 && formData.numOfCustomers === "Size") return;
    if (currentStep === 2 && formData.businessGoal === "Goal") return;
    if (
      currentStep === 3 &&
      (!formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.phone.trim() ||
        !formData.email.trim())
    )
      return;
    if (
      currentStep === 4 &&
      (!formData.appointmentDate || !formData.appointmentTime) &&
      !bookingComplete
    )
      return;

    if (currentStep < 4) {
      setPreviousStep(currentStep);
      setDirection("next");
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === 4 && !bookingComplete) {
      handleBookAppointment();
    } else {
      // Final submission after booking is complete
      console.log("Form submitted:", formData);
    }
  };

  // Go back to previous step with animation
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setDirection("prev");
      setCurrentStep((prev) => prev - 1);

      // Reset booking state if going back from booking step
      if (currentStep === 4) {
        setBookingComplete(false);
      }
    } else {
      console.log("Back to previous page or home");
    }
  };

  // Step content components
  const stepContent = [
    // Step 1: Business Type Dropdown
    <div
      key="step1"
      className="flex w-full flex-col items-center gap-6 overflow-hidden"
    >
      <h1 className="text-center text-base md:text-xl">
        What type of business do you operate?
      </h1>
      <div className="w-full max-w-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-inherit"
            >
              {formData.businessType} <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-full rounded-lg bg-background p-2"
            style={{
              width: "var(--radix-dropdown-menu-trigger-width)",
              position: "relative",
              transform: "none",
              transformOrigin: "top center",
            }}
          >
            {BUSINESS_CATEGORIES.map((business) => (
              <DropdownMenuCheckboxItem
                key={business}
                checked={formData.businessType === business}
                onCheckedChange={(isChecked) => {
                  if (isChecked) {
                    handleDropdownChange("businessType", business);
                  }
                }}
              >
                {business}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>,

    // Step 2: Number of Customers
    <div key="step2" className="flex w-full flex-col items-center gap-6">
      <h1 className="text-center text-base md:text-xl">
        How many customers do you serve each week?
      </h1>
      <div className="w-full max-w-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-inherit"
            >
              {formData.numOfCustomers} <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-full rounded-lg bg-background p-2"
            style={{
              width: "var(--radix-dropdown-menu-trigger-width)",
              position: "relative",
              transform: "none",
              transformOrigin: "top center",
            }}
          >
            {["Less than 50", "50-100", "100-500", "500-1000", "1000+"].map(
              (size) => (
                <DropdownMenuCheckboxItem
                  key={size}
                  checked={formData.numOfCustomers === size}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      handleDropdownChange("numOfCustomers", size);
                    }
                  }}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>,

    // Step 3: Business Goal Dropdown
    <div key="step3" className="flex w-full flex-col items-center gap-6">
      <h1 className="text-wrap text-center text-base md:text-xl">
        What&apos;s your main goal for exploring AI for customer service?
      </h1>
      <div className="w-full max-w-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-inherit"
            >
              {formData.businessGoal} <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-full rounded-lg bg-background p-2"
            style={{
              width: "var(--radix-dropdown-menu-trigger-width)",
              position: "relative",
              transform: "none",
              transformOrigin: "top center",
            }}
          >
            {BUSINESS_GOALS.map((goal) => (
              <DropdownMenuCheckboxItem
                key={goal}
                checked={formData.businessGoal === goal}
                onCheckedChange={(isChecked) => {
                  if (isChecked) {
                    handleDropdownChange("businessGoal", goal);
                  }
                }}
              >
                {goal}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>,

    // Step 4: Contact Information
    <div key="step4" className="flex w-full flex-col items-center gap-6">
      <h1 className="text-center text-base md:text-xl">
        Your contact information
      </h1>
      <div className="w-full max-w-md space-y-4 px-2">
        <Input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          name="phone"
          placeholder="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
    </div>,

    // Step 5: Calendar Booking with shadcn Calendar
    <div key="step5" className="flex w-full flex-col items-center gap-6">
      {!bookingComplete ? (
        <>
          <h1 className="text-center text-base md:text-xl">
            Book your complimentary 30-minute consultation
          </h1>
          <div className="w-full max-w-md space-y-4">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                showOutsideDays={true}
                showYearSwitcher={true}
                className="mx-auto"
              />
            </div>

            {/* Selected date and time slots */}
            {selectedDate && (
              <div className="mt-6 space-y-4">
                <h3 className="text-center text-sm font-medium">
                  Available times for {formatDate(selectedDate)}
                </h3>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {availableTimeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`rounded-md border px-2 py-1 text-sm ${slot.available ? "cursor-pointer hover:bg-muted" : "cursor-not-allowed opacity-50"} ${formData.appointmentTime === slot.display ? "border-orange-500 bg-orange-100 text-orange-800" : ""} `}
                      onClick={() => slot.available && handleTimeSelect(slot)}
                      disabled={!slot.available}
                    >
                      {slot.display}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selection summary */}
            {selectedDate && formData.appointmentTime && (
              <div className="mt-4 rounded-md bg-muted p-4 text-sm">
                <p>
                  <strong>Selected appointment:</strong>
                </p>
                <p>
                  {formatDate(selectedDate)} at {formData.appointmentTime}
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <Check className="size-8 text-green-600" />
          </div>
          <h1 className="text-xl font-medium md:text-2xl">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Your consultation has been scheduled for:
          </p>
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="font-medium">
              {formatDate(formData.appointmentDate)}
            </p>
            <p>{formData.appointmentTime}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            We&apos;ve sent a confirmation email to {formData.email} with all
            the details.
          </p>
        </div>
      )}
    </div>,
  ];

  // Get animation classes based on direction and step change
  const getAnimationClasses = (index: number) => {
    if (index === currentStep) {
      return direction === "next"
        ? "animate-slide-in-right"
        : "animate-slide-in-left";
    } else if (index === previousStep) {
      return direction === "next"
        ? "animate-slide-out-left"
        : "animate-slide-out-right";
    }
    return "hidden opacity-0";
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-between bg-background bg-gradient-to-r from-card to-background p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-row items-center justify-center gap-2 overflow-hidden transition-all duration-700 ease-out${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Image alt="Logo" src="/images/logo.png" width={100} height={100} />
          <h1 className="text-3xl font-bold lg:text-5xl">Setset</h1>
        </div>

        <p
          className={`text-center text-muted-foreground transition-opacity delay-300 duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          Empower your business with smart, always-on voice AI that never misses
          a call
        </p>

        <Card
          className={`w-full max-w-2xl overflow-hidden transition-all delay-500 duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <CardContent className="pb-8 pt-6">
            <div className="relative left-4 top-4">
              <Button
                variant="link"
                className="m-0 h-auto p-0 text-secondary"
                onClick={handlePrevStep}
              >
                {currentStep > 0 && (
                  <ArrowLeft style={{ width: "20px", height: "20px" }} />
                )}
              </Button>
            </div>

            {/* Step content with animations - using absolute positioning for smooth transitions */}
            <div className="relative mt-8" style={{ minHeight: "200px" }}>
              {stepContent.map((content, index) => (
                <div
                  key={`step-content-${index}`}
                  className={`${getAnimationClasses(index)} mx-auto w-full max-w-md`}
                >
                  {content}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex w-full justify-center">
              <Button
                onClick={handleNextStep}
                className="bg-orange-500 px-8 py-2 text-white hover:bg-orange-600"
              >
                {currentStep === 4
                  ? bookingComplete
                    ? "Finish"
                    : "Book Now"
                  : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Progress indicators */}
      <div className="mt-8 flex w-full max-w-2xl justify-between px-4">
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-2 w-1/6 rounded-full transition-all duration-500 ${
              step <= currentStep
                ? "bg-orange-500"
                : "bg-gray-400 dark:bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

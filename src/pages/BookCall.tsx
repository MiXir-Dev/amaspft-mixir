import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { bookingContent } from "@/consts/book-call.const";
import BookCallStepIndicator from "@/components/book-call/BookCallStepIndicator";
import BookCallStepEmail from "@/components/book-call/BookCallStepEmail";
import BookCallStepSchedule from "@/components/book-call/BookCallStepSchedule";
import BookCallStepConfirm from "@/components/book-call/BookCallStepConfirm";

const BookCall = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleNext = () => {
    if (step === 1) {
      if (!validateEmail(email)) {
        toast.error(bookingContent.toasts.invalidEmail);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        toast.error(bookingContent.toasts.missingDateTime);
        return;
      }
      setStep(3);
      // Here you'd normally make an API call to schedule the meeting
      toast.success(bookingContent.toasts.scheduled);
    }
  };

  const availableDates = bookingContent.availableDates;
  const availableTimes = bookingContent.availableTimes;
  const formatDateShort = (date: string) =>
    new Date(date).toLocaleDateString(bookingContent.dateLocale, bookingContent.dateFormats.short);
  const formatDateLong = (date: string) =>
    new Date(date).toLocaleDateString(bookingContent.dateLocale, bookingContent.dateFormats.long);
  
  return (
    <div className="min-h-screen bg-tradingbg-600 text-white">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{bookingContent.title}</h1>
            <p className="text-gray-400">{bookingContent.description}</p>
          </div>

          <div className="bg-tradingbg-700 border border-gray-800 rounded-lg p-6 md:p-8">
            <BookCallStepIndicator step={step} />

            <div className="mt-8">
              {step === 1 && (
                <BookCallStepEmail
                  email={email}
                  onEmailChange={setEmail}
                  onNext={handleNext}
                />
              )}

              {step === 2 && (
                <BookCallStepSchedule
                  availableDates={availableDates}
                  availableTimes={availableTimes}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectDate={setSelectedDate}
                  onSelectTime={setSelectedTime}
                  onNext={handleNext}
                  formatDateShort={formatDateShort}
                />
              )}

              {step === 3 && (
                <BookCallStepConfirm
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  formatDateLong={formatDateLong}
                  onReturnHome={() => (window.location.href = "/")}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookCall;

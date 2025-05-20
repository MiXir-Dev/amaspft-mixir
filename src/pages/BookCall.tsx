
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle } from "lucide-react";

const BookCall = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time");
        return;
      }
      setStep(3);
      // Here you'd normally make an API call to schedule the meeting
      toast.success("Your call has been scheduled!");
    }
  };

  // Mock date/time data - would normally come from availability API
  const availableDates = ["2025-05-22", "2025-05-23", "2025-05-24", "2025-05-25"];
  const availableTimes = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];

  return (
    <div className="min-h-screen bg-tradingbg-600 text-white">
      <Header />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Free Strategy Call</h1>
            <p className="text-gray-400">
              Schedule a 15-minute call to discuss your trading goals and see how we can help.
            </p>
          </div>
          
          <div className="bg-tradingbg-700 border border-gray-800 rounded-lg p-6 md:p-8">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-mintgreen-300 text-tradingbg-600" : "bg-gray-800 text-gray-500"}`}>
                  1
                </div>
                <span className={`text-xs ${step >= 1 ? "text-mintgreen-300" : "text-gray-500"}`}>
                  Email
                </span>
              </div>
              
              <div className="flex-1 flex items-center">
                <div className={`h-0.5 w-full ${step >= 2 ? "bg-mintgreen-300" : "bg-gray-800"}`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-mintgreen-300 text-tradingbg-600" : "bg-gray-800 text-gray-500"}`}>
                  2
                </div>
                <span className={`text-xs ${step >= 2 ? "text-mintgreen-300" : "text-gray-500"}`}>
                  Schedule
                </span>
              </div>
              
              <div className="flex-1 flex items-center">
                <div className={`h-0.5 w-full ${step >= 3 ? "bg-mintgreen-300" : "bg-gray-800"}`}></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-mintgreen-300 text-tradingbg-600" : "bg-gray-800 text-gray-500"}`}>
                  3
                </div>
                <span className={`text-xs ${step >= 3 ? "text-mintgreen-300" : "text-gray-500"}`}>
                  Confirm
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-medium mb-6">Enter your email</h2>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-6 bg-tradingbg-800 border-gray-700 focus:border-mintgreen-300"
                  />
                  <Button 
                    onClick={handleNext}
                    className="w-full bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
                  >
                    Continue
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-medium mb-6">Select a date & time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-mintgreen-300" />
                      Select a date
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableDates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-md border ${
                            selectedDate === date
                              ? "bg-mintgreen-300 text-tradingbg-600 border-mintgreen-300"
                              : "bg-tradingbg-800 border-gray-700 hover:border-mintgreen-300/50"
                          }`}
                        >
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2 flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-mintgreen-300" />
                      Select a time
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-md border ${
                            selectedTime === time
                              ? "bg-mintgreen-300 text-tradingbg-600 border-mintgreen-300"
                              : "bg-tradingbg-800 border-gray-700 hover:border-mintgreen-300/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
                  >
                    Schedule Call
                  </Button>
                </div>
              )}
              
              {step === 3 && (
                <div className="animate-fade-in text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-mintgreen-300" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">Your call is scheduled!</h2>
                  <p className="text-gray-400 mb-6">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                  </p>
                  
                  <div className="bg-tradingbg-800 border border-gray-700 rounded-md p-4 mb-6 text-left">
                    <div className="font-medium mb-1">What happens next?</div>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-mintgreen-300 mr-2">•</span>
                        You'll receive a confirmation email with Zoom link
                      </li>
                      <li className="flex items-start">
                        <span className="text-mintgreen-300 mr-2">•</span>
                        We'll send a calendar invitation for the scheduled time
                      </li>
                      <li className="flex items-start">
                        <span className="text-mintgreen-300 mr-2">•</span>
                        Prepare any questions about your trading goals
                      </li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
                  >
                    Return to Home
                  </Button>
                </div>
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

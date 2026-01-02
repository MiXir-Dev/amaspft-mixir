import { Button } from "@/components/ui/button";
import { bookingContent } from "@/consts/book-call.const";
import { siteButtons } from "@/consts/site.const";
import { CheckCircle } from "lucide-react";

type BookCallStepConfirmProps = {
  selectedDate: string;
  selectedTime: string;
  formatDateLong: (date: string) => string;
  onReturnHome: () => void;
};

const BookCallStepConfirm = ({
  selectedDate,
  selectedTime,
  formatDateLong,
  onReturnHome,
}: BookCallStepConfirmProps) => {
  return (
    <div className="animate-fade-in text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-mintgreen-300" />
      </div>
      <h2 className="text-xl font-medium mb-2">{bookingContent.stepHeadings.confirmation}</h2>
      <p className="text-gray-400 mb-6">
        {selectedDate && formatDateLong(selectedDate)} {bookingContent.timeConnector} {selectedTime}
      </p>
      
      <div className="bg-tradingbg-800 border border-gray-700 rounded-md p-4 mb-6 text-left">
        <div className="font-medium mb-1">{bookingContent.successDetailsLabel}</div>
        <ul className="text-gray-400 text-sm space-y-2">
          {bookingContent.successDetails.map((detail) => (
            <li key={detail} className="flex items-start">
              <span className="text-mintgreen-300 mr-2">{bookingContent.bullet}</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        onClick={onReturnHome}
        className="bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
      >
        {siteButtons.returnHome}
      </Button>
    </div>
  );
};

export default BookCallStepConfirm;

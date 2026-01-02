import { bookingContent } from "@/consts/book-call.const";

type BookCallStepIndicatorProps = {
  step: number;
};

const BookCallStepIndicator = ({ step }: BookCallStepIndicatorProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-mintgreen-300 text-tradingbg-600" : "bg-gray-800 text-gray-500"}`}>
          1
        </div>
        <span className={`text-xs ${step >= 1 ? "text-mintgreen-300" : "text-gray-500"}`}>
          {bookingContent.steps[0].label}
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
          {bookingContent.steps[1].label}
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
          {bookingContent.steps[2].label}
        </span>
      </div>
    </div>
  );
};

export default BookCallStepIndicator;

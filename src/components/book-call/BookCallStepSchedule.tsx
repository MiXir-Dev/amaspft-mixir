import { Button } from "@/components/ui/button";
import { bookingContent } from "@/consts/book-call.const";
import { Calendar, Clock } from "lucide-react";

type BookCallStepScheduleProps = {
  availableDates: string[];
  availableTimes: string[];
  selectedDate: string;
  selectedTime: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  formatDateShort: (date: string) => string;
};

const BookCallStepSchedule = ({
  availableDates,
  availableTimes,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
  formatDateShort,
}: BookCallStepScheduleProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-medium mb-6">{bookingContent.stepHeadings.schedule}</h2>
      
      <div className="mb-6">
        <label className="block text-gray-300 mb-2 flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-mintgreen-300" />
          {bookingContent.labels.selectDate}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`p-3 rounded-md border ${
                selectedDate === date
                  ? "bg-mintgreen-300 text-tradingbg-600 border-mintgreen-300"
                  : "bg-tradingbg-800 border-gray-700 hover:border-mintgreen-300/50"
              }`}
            >
              {formatDateShort(date)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-300 mb-2 flex items-center">
          <Clock className="mr-2 h-4 w-4 text-mintgreen-300" />
          {bookingContent.labels.selectTime}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
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
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
      >
        {bookingContent.buttons.schedule}
      </Button>
    </div>
  );
};

export default BookCallStepSchedule;

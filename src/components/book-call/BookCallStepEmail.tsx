import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingContent } from "@/consts/book-call.const";

type BookCallStepEmailProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onNext: () => void;
};

const BookCallStepEmail = ({ email, onEmailChange, onNext }: BookCallStepEmailProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-medium mb-6">{bookingContent.stepHeadings.email}</h2>
      <Input
        type="email"
        placeholder={bookingContent.emailPlaceholder}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="mb-6 bg-tradingbg-800 border-gray-700 focus:border-mintgreen-300"
      />
      <Button 
        onClick={onNext}
        className="w-full bg-mintgreen-300 hover:bg-mintgreen-400 text-tradingbg-600"
      >
        {bookingContent.buttons.continue}
      </Button>
    </div>
  );
};

export default BookCallStepEmail;


import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const StarRating = ({ 
  rating, 
  maxRating = 5,
  size = 18,
  className = ""
}: StarRatingProps) => {
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          size={size}
          className={`${i <= rating ? "fill-mintgreen-300 text-mintgreen-300" : "fill-gray-600 text-gray-600"} transition-colors`}
        />
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex ${className}`}>
      {renderStars()}
    </div>
  );
};

export default StarRating;

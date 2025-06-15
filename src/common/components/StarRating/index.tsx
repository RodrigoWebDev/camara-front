import React from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  maxStars?: number;
  className?: string;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  className,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} className="h-4 w-4 text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
